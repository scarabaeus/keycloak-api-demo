import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  IconButton,
  ReactDataTable,
  Card,
  CardHeader,
  CardContent,
  Icon,
  IconNames,
  ButtonKind,
  Typography,
  TypographySize,
  GenericCell,
  useStyletron,
} from '@metromile-ebs/ebs-tui';
import { allUsers, deleteUser } from '../../modules/users';
import RenderOnRole from '../../components/RenderOnRole';

const UserList = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);
  const [css, theme] = useStyletron();

  useEffect(() => {
    dispatch(allUsers());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const userListColumns = useMemo(
    () => [
      {
        Header: 'User Name',
        accessor: 'username',
        disableSortBy: true,
        url: ({ id }) => `/instances/${id}`,
        truncate: false,
        Cell: GenericCell,
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
        disableSortBy: true,
        truncate: false,
        Cell: GenericCell,
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        disableSortBy: true,
        truncate: false,
        Cell: GenericCell,
      },
      {
        Header: 'Email Verified',
        accessor: 'verified',
        disableSortBy: true,
        truncate: false,
        Cell: GenericCell,
        formatter: (enabled) => (enabled ? 'Yes' : 'No'),
      },
      {
        Header: 'Enabled',
        accessor: 'enabled',
        disableSortBy: true,
        Cell: GenericCell,
        truncate: false,
        formatter: (enabled) => (enabled ? 'Yes' : 'No'),
      },
      {
        Header: ' ',
        accessor: 'id',
        disableSortBy: true,
        Cell: GenericCell,
        minWidth: 60,
        maxWidth: 60,
        truncate: true,
        formatter: (enabled) => (
          <RenderOnRole roles={['user-delete']}>
            <IconButton kind={ButtonKind.TERTIARY} label={IconNames.HEART}>
              <Icon name={IconNames.TRASH} inheritColor />
            </IconButton>
          </RenderOnRole>
        ),
      },
    ],
    [],
  );

  return (
    <RenderOnRole roles={['user-list']}>
      <Card
        marginTop={0}
        header={
          <div
            style={{
              display: 'flex',
              paddingTop: '1rem',
              paddingBottom: '1rem',
            }}
          >
            <div
              style={{ flex: 1, paddingLeft: '1.5rem', paddingTop: '0.5rem' }}
            >
              <Typography size={TypographySize.HEADING_LARGE}>Users</Typography>
            </div>
            <RenderOnRole roles={['user-create']}>
              <div
                style={{
                  textAlign: 'right',
                  paddingRight: '1rem',
                }}
              >
                <IconButton kind={ButtonKind.SECONDARY}>
                  <Icon name={IconNames.PLUS} inheritColor />
                </IconButton>
              </div>
            </RenderOnRole>
          </div>
        }
      >
        <ReactDataTable
          columns={userListColumns}
          data={users}
          pageSize={10}
          totalRecords={users.length}
          manual
        />
      </Card>
    </RenderOnRole>
  );
};

export default UserList;
