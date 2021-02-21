import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Product from './components/products/Product';
import NewProduct from './components/products/NewProduct';
import NewMessage from './components/messages/NewMessage';
import Code from './components/pages/Code';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';

import ProductState from './context/product/ProductState';
import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <AuthState>
      <ProductState>
        <Router>
          <Fragment>
            <Navbar />
            <div className='container'>
              <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <PrivateRoute exact path='/product/:id' component={Product} />
                <PrivateRoute
                  exact
                  path='/product/:id/newmessage'
                  component={NewMessage}
                />
                <PrivateRoute exact path='/newproduct' component={NewProduct} />
                <PrivateRoute exact path='/code' component={Code} />
                <Route exact path='/about' component={About} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ProductState>
    </AuthState>
  );
};

export default App;
