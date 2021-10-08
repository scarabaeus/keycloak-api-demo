import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import {
  IconButton,
  Card,
  CardContent,
  CardFooter,
  Icon,
  IconNames,
  Button,
  ButtonKind,
  Typography,
  TypographySize,
  useStyletron,
  Input,
  Spacer,
  Checkbox,
  CheckboxTextPlacement,
  Select,
} from '@metromile-ebs/ebs-tui';
import RenderOnRole from '../../components/RenderOnRole';
import { PERMISSIONS, ROUTES } from '../../constants';
import {
  getUser,
  updateUser,
  getAssignedClientRolesForUser,
  getAvailableClientRolesForUser,
  getAssignedRealmRolesForUser,
  getAvailableRealmRolesForUser,
} from '../../modules/users';
import { getClients } from '../../modules/clients';
import UserService from '../../services/UserService';

const UserForm = ({ disabled, newUser = false }) => {
  const { userId } = useParams();
  const history = useHistory();
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '' });
  const [clientId, setClientId] = useState(null);
  const [clients, setClients] = useState([]);
  const [availableClientRoles, setAvailableClientRoles] = useState([]);
  const [assignedClientRoles, setAssignedClientRoles] = useState([]);
  const [availableRealmRoles, setAvailableRealmRoles] = useState([]);
  const [assignedRealmRoles, setAssignedRealmRoles] = useState([]);
  const [css] = useStyletron();

  useEffect(() => {
    if (!newUser) {
      getUser({ userId }).then((user) => {
        setUser(user);
      });

      getClients().then((clients) => {
        setClients(clients);
      });

      getAvailableRealmRolesForUser({ userId }).then(
        (availableRealmRoles = []) => {
          setAvailableRealmRoles(availableRealmRoles);
        },
      );

      getAssignedRealmRolesForUser({ userId }).then(
        (assignedRealmRoles = []) => {
          setAssignedRealmRoles(assignedRealmRoles);
        },
      );
    }
  }, [userId, newUser]);

  useEffect(() => {
    if (clientId) {
      getAvailableClientRolesForUser({ userId, clientId }).then(
        (availableClientRoles) => {
          setAvailableClientRoles(availableClientRoles);
        },
      );

      getAssignedClientRolesForUser({ userId, clientId }).then(
        (assignedClientRoles) => {
          setAssignedClientRoles(assignedClientRoles);
        },
      );
    }
  }, [clientId, userId]);

  const handleChange = (name, event) => {
    const { value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleCheckChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const handleSave = () => {
    updateUser({ userId, data: user }).then((user) => {
      handleGoHome();
    });
  };

  const handleGoHome = () => {
    history.push(ROUTES.ROOT);
  };

  return (
    <RenderOnRole roles={[PERMISSIONS.USER_LIST]}>
      <Card
        marginTop={0}
        header={
          <div
            className={css({
              display: 'flex',
              paddingTop: '1rem',
              paddingBottom: '1rem',
            })}
          >
            <div
              className={css({
                flex: 1,
                paddingLeft: '1.5rem',
                paddingTop: '0.5rem',
              })}
            >
              <Typography size={TypographySize.HEADING_LARGE}>
                {user.firstName} {user.lastName}
              </Typography>
            </div>
            {!UserService.isSelf(user.id) && !newUser ? (
              <RenderOnRole roles={[PERMISSIONS.USER_DELETE]}>
                <div
                  className={css({
                    textAlign: 'right',
                    paddingRight: '1rem',
                  })}
                >
                  <IconButton
                    kind={ButtonKind.SECONDARY}
                    onClick={() => {
                      history.push(`${ROUTES.USER}/new`);
                    }}
                  >
                    <Icon name={IconNames.TRASH} inheritColor />
                  </IconButton>
                </div>
              </RenderOnRole>
            ) : null}
          </div>
        }
        footer={
          <CardFooter>
            <Button kind={ButtonKind.SECONDARY} onClick={handleGoHome}>
              Back
            </Button>
            {!disabled ? (
              <Button
                kind={ButtonKind.PRIMARY}
                onClick={handleSave}
                className={css({ marginLeft: '1rem !important' })}
              >
                Save Changes
              </Button>
            ) : null}
          </CardFooter>
        }
      >
        <CardContent>
          <Input
            placeholder="First Name"
            label="First Name"
            onChange={(e) => handleChange('firstName', e)}
            value={user.firstName}
            disabled={disabled}
          />
          <Spacer height="1.5rem" />
          <Input
            placeholder="Last Name"
            label="Last Name"
            onChange={(e) => handleChange('lastName', e)}
            value={user.lastName}
            disabled={disabled}
          />
          <Spacer height="1.5rem" />
          <Input
            placeholder="Email"
            label="Email"
            onChange={(e) => handleChange('email', e)}
            value={user.email}
            disabled={disabled}
          />
          <Spacer height="1.5rem" />
          <Checkbox
            id="checkbox2"
            isChecked={user.enabled}
            onChange={(e, a) => {
              console.log(a);
              handleCheckChange('enabled', e);
            }}
            textPlacement={CheckboxTextPlacement.RIGHT}
            description="Enabled"
            disabled={disabled || UserService.isSelf(user.id)}
          />
          <RenderOnRole roles={[PERMISSIONS.USER_ROLE]}>
            <Spacer height="1.5rem" />
            <Typography size={TypographySize.HEADING_MEDIUM}>
              Realm Roles
            </Typography>
            <div
              style={{
                display: 'flex',
                width: '100% !important',
                marginTop: '1rem',
              }}
            >
              {/* <div style={{ flex: 1 }}>
                <Typography size={TypographySize.HEADING_SMALL}>
                  Unassigned Realm Roles
                </Typography>
                {availableRealmRoles.map(({ name }) => (
                  <div>{name}</div>
                ))}
              </div> */}
              <div style={{ flexBasis: '1rem' }}></div>
              <div style={{ flex: 1 }}>
                <Typography size={TypographySize.HEADING_SMALL}>
                  Assigned Realm Roles
                </Typography>
                {assignedRealmRoles.map(({ name }) => (
                  <div>{name}</div>
                ))}
              </div>
            </div>
            <Spacer height="1.5rem" />
            <Typography size={TypographySize.HEADING_MEDIUM}>
              Client Roles
            </Typography>
            <Spacer height="1rem" />
            <Select
              label="Client"
              options={clients.reduce((acc, { clientId }) => {
                acc.push(clientId);
                return acc;
              }, [])}
              onChange={(v) => {
                if (v) {
                  const client = clients.find(({ clientId }) => clientId === v);
                  setClientId(client.id);
                } else {
                  setClientId(null);
                }
              }}
              placeholder="Client"
            />
            <div
              style={{
                display: 'flex',
                width: '100% !important',
                marginTop: '1rem',
              }}
            >
              {/* <div style={{ flex: 1 }}>
                <Typography size={TypographySize.HEADING_SMALL}>
                  Unassigned Client Roles
                </Typography>
                {availableClientRoles.map(({ name }) => (
                  <div>{name}</div>
                ))}
              </div> */}
              <div style={{ flexBasis: '1rem' }}></div>
              <div style={{ flex: 1 }}>
                <Typography size={TypographySize.HEADING_SMALL}>
                  Assigned Client Roles
                </Typography>
                {assignedClientRoles.map(({ name }) => (
                  <div>{name}</div>
                ))}
              </div>
            </div>
          </RenderOnRole>
        </CardContent>
      </Card>
    </RenderOnRole>
  );
};

export default UserForm;
