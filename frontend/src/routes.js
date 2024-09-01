import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import BookList from './pages/BookList';
import BookDetail from './pages/BookDetail';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import Login from './pages/Login';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/books" component={BookList} />
      <Route path="/book/:isbn" component={BookDetail} />
      <Route path="/cart" component={Cart} />
      <Route path="/admin" component={Admin} />
      <Route path="/login" component={Login} />
    </Switch>
  </Router>
);

export default Routes;
