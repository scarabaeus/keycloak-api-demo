import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {
  ThemeProvider,
  TypographySize,
  PageContainer,
  PageContent,
  PageHeader,
  Typography,
  IconNames,
  ButtonKind,
  IconButton,
  Icon,
  useStyletron,
} from '@metromile-ebs/ebs-tui';
import StoreService from './services/StoreService';
import UserService from './services/UserService';
import RenderOnAnonymous from './components/RenderOnAnonymous';
import RenderOnAuthenticated from './components/RenderOnAuthenticated';
import UserList from './components/UserList';

const AppContainer = ({ children }) => {
  const [css] = useStyletron();
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      })}
    >
      {children}
    </div>
  );
};

const store = StoreService.setup();

const App = () => (
  <Provider store={store}>
    <ThemeProvider>
      <AppContainer>
        <BrowserRouter>
          <div>
            <RenderOnAnonymous>
              <IconButton
                kind={ButtonKind.SECONDARY}
                onClick={() => UserService.doLogin()}
              >
                <Icon name={IconNames.TRASH} inheritColor />
              </IconButton>
            </RenderOnAnonymous>
            <RenderOnAuthenticated>
              <PageHeader sticky={true}>
                <div style={{ width: '100%', display: 'flex' }}>
                  <div style={{ flex: 1, paddingTop: '0.25rem' }}>
                    <Typography size={TypographySize.HEADING_LARGE}>
                      KeyCloak API Demo
                    </Typography>
                  </div>
                  <div
                    style={{
                      flexBasis: '200px',
                      display: 'inline-flex',
                      marginLeft: 'auto',
                      marginRight: '0',
                    }}
                  >
                    <div
                      style={{
                        textAlign: 'right',
                        paddingTop: '0.5rem',
                      }}
                    >
                      <Typography>
                        Welcome, {UserService.getFirstName()}
                      </Typography>
                    </div>
                    <div style={{ flexBasis: '3rem', textAlign: 'right' }}>
                      <IconButton
                        kind={ButtonKind.QUATERNARY}
                        onClick={() => UserService.doLogout()}
                      >
                        <Icon name={IconNames.LOG_OUT} inheritColor />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </PageHeader>
              <PageContainer
                overflowY="visible"
                paddingBottom="3rem"
                paddingLeft="1rem"
                paddingRight="1rem"
                paddingTop="1rem"
              >
                <PageContent padding={0}>
                  <UserList />
                </PageContent>
              </PageContainer>
            </RenderOnAuthenticated>
          </div>
        </BrowserRouter>
      </AppContainer>
    </ThemeProvider>
  </Provider>
);

export default App;
