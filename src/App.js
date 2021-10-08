import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  ThemeProvider,
  PageContainer,
  PageContent,
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
import PageHeader from './components/PageHeader';
import UserList from './components/UserList';
import NoMatch from './components/NoMatch';
import UserForm from './components/UserForm';
import { PERMISSIONS, ROUTES } from './constants';

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
              <PageHeader />
              <PageContainer
                overflowY="visible"
                paddingBottom="3rem"
                paddingLeft="1rem"
                paddingRight="1rem"
                paddingTop="1rem"
              >
                <PageContent padding={0}>
                  <Switch>
                    <Route exact path="/">
                      <UserList />
                    </Route>
                    <Route exact path={`${ROUTES.USER}/new`}>
                      <UserForm newUser />
                    </Route>
                    <Route path={`${ROUTES.USER}/:userId`}>
                      <UserForm
                        disabled={
                          !UserService.hasRole([PERMISSIONS.USER_UPDATE])
                        }
                      />
                    </Route>
                    <Route path="*">
                      <NoMatch />
                    </Route>
                  </Switch>
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
