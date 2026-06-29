import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import SideMenu from './components/SideMenu';
import OpeningPage from './pages/OpeningPage';

import { lazy, Suspense } from 'react';
const Dashboard = lazy(() => import('./pages/Dashboard'));

import ComponentsPage from './pages/ComponentsPage';
import ActivityLogs from './pages/ActivityLogs';
import Notifications from './pages/Notifications';
import AboutUs from './pages/AboutUs';
import Settings from './pages/Settings';

import { SettingsProvider } from './context/SettingsContext';
import { AppDataProvider } from './context/AppDataContext';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* AdlaWatt theme (colors, dark mode, color-blind mode, Inter font) */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <SettingsProvider>
      <AppDataProvider>
        <IonReactRouter>
          <IonSplitPane contentId="main-content">
            {/* Hamburger menu, present across every page except Opening */}
            <SideMenu />

            <IonRouterOutlet id="main-content">
              {/* Opening/splash screen — first thing the user sees */}
              <Route exact path="/" component={OpeningPage} />

              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/components" component={ComponentsPage} />
              <Route exact path="/activity-logs" component={ActivityLogs} />
              <Route exact path="/notifications" component={Notifications} />
              <Route exact path="/about" component={AboutUs} />
              <Route exact path="/settings" component={Settings} />

              <Route exact path="/home">
                <Redirect to="/dashboard" />
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </AppDataProvider>
    </SettingsProvider>
  </IonApp>
);

export default App;
