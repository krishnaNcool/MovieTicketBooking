import './App.scss';
import './Responsive.scss';
import Main from './components/MainComponent';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './components/LandingComponent';
import ImprintComponent from './components/ImprintComponent';
import PrivacyComponent from './components/PrivacyComponent';
import FooterComponent from './components/FooterComponent';
import 'font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/home">
            <div className="main">
              <Main />
            </div>
          </Route>
          <Route exact path="/imprint">
            <ImprintComponent />
          </Route>
          <Route exact path="/privacy">
            <PrivacyComponent />
          </Route>
        </Switch>
      </BrowserRouter>
      <FooterComponent />
    </>
  );
}

export default App;
