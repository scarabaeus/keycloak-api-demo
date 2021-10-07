import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import StoreService from './services/StoreService';
import UserService from './services/UserService';
import RenderOnAnonymous from './components/RenderOnAnonymous';
import RenderOnAuthenticated from './components/RenderOnAuthenticated';
import UserList from './components/UserList';

const store = StoreService.setup();

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <RenderOnAnonymous>
          <div>
            <button
              className="btn btn-lg btn-warning"
              onClick={() => UserService.doLogin()}
            >
              Login
            </button>
          </div>
        </RenderOnAnonymous>
        <RenderOnAuthenticated>
          <div style={{ width: '100%', display: 'flex' }}>
            <div style={{ flex: 1 }}>KeyCloak API Demo</div>
            <div style={{ flex: 1, textAlign: 'right' }}>
              Welcome, {UserService.getFirstName()}{' '}
              <button
                className="btn btn-lg btn-warning"
                onClick={() => UserService.doLogout()}
              >
                Log Out
              </button>
            </div>
          </div>
          <UserList />
        </RenderOnAuthenticated>
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
