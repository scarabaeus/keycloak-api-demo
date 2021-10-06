import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import StoreService from './services/StoreService';
import UserService from './services/UserService';
import RenderOnAnonymous from './components/RenderOnAnonymous';
import RenderOnAuthenticated from './components/RenderOnAuthenticated';

const store = StoreService.setup();

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        KeyCloak API Demo
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
          <div>Authenticated Content</div>
        </RenderOnAuthenticated>
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
