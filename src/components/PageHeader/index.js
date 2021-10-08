import {
  TypographySize,
  PageHeader as TuiHeader,
  Typography,
  IconNames,
  ButtonKind,
  IconButton,
  Icon,
  useStyletron,
} from '@metromile-ebs/ebs-tui';
import UserService from '../../services/UserService';

const PageHeader = () => {
  const [css] = useStyletron();
  return (
    <TuiHeader sticky={true}>
      <div className={css({ width: '100%', display: 'flex' })}>
        <div className={css({ flex: 1, paddingTop: '0.25rem' })}>
          <Typography size={TypographySize.HEADING_LARGE}>
            KeyCloak API Demo
          </Typography>
        </div>
        <div
          className={css({
            flexBasis: '165px',
            display: 'inline-flex',
            marginLeft: 'auto',
            marginRight: '0',
            float: 'right',
          })}
        >
          <div
            className={css({
              textAlign: 'right',
              paddingTop: '0.5rem',
            })}
          >
            <Typography>Welcome, {UserService.getFirstName()}</Typography>
          </div>
          <div className={css({ flexBasis: '3rem', textAlign: 'right' })}>
            <IconButton
              kind={ButtonKind.QUATERNARY}
              onClick={() => UserService.doLogout()}
            >
              <Icon name={IconNames.LOG_OUT} inheritColor />
            </IconButton>
          </div>
        </div>
      </div>
    </TuiHeader>
  );
};

export default PageHeader;
