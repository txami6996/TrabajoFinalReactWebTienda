import React from 'react';
import './App.css';
import Header from '../components/Header/Header';
import FooterPlant from '../components/Footer/FooterPlant';
import Home from '../containers/Home/Home';
import Historial from '../containers/HistorialPedidos/HistorialPedidos';
//import Carrito from '../containers/Carrito/Carrito';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Login from '../components/Login/Login';
//import Salida from './components/Salida/Salida';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entrada: "",
      otherState: 'some other value',
      myArray: [],
      auth: false,
      authData: {}
    }
  }
  setAuthentication = (auth, data) => {
    this.setState({ auth: auth });
    this.setState({ authData: data });
  }

  logoutUser = () => {
    this.setState({ auth: false });
    this.setState({ authData: {} });
  }
  render() {

    let rutaHistorial = null;
    let menuAdd = null;
    if (this.state.auth) {

      menuAdd = (

        <li>
          <Link to="/historial">Mi Historial</Link>
        </li>

      );
      rutaHistorial = (
         <Route path="/historial" render={(props) => <Historial {...props} idToken={this.state.authData.idToken} />} />
      );
    } else {
      menuAdd = (
        <li>
          <Link to="/Login">Login</Link>
        </li>
      );
    }
    return (
      <Container fluid > 
        <Header />
        <Router>
          <div>
            <nav >
              <ul className="ulHeader">
                <li >
                  <Link to="/">Home</Link>
                </li>
                {menuAdd}

              </ul>
            </nav>

            <Switch>
              {rutaHistorial}
              <Route path="/login" render={(props) => <Login {...props} setAuthentication={this.setAuthentication} idToken={this.state.authData.idToken} />} />
              <Route path="/">
                <Home />
              </Route>

            </Switch>
          </div>
        </Router>
        <FooterPlant />

      </Container>
    );

  }
}

export default App;
