import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route, IndexRoute } from 'react-router-dom';
import './index.css';
import AutorBox from './Autor';
import LivroBox from './Livro';
import Home from './Home';

ReactDOM.render(
  <Router>
    <div>
      <App>
        <Route exact path="/" component={Home} />
        <Route path="/autor" component={AutorBox} />
        <Route path="/livro" component={LivroBox} />
      </App>
    </div>
  </Router>,
  document.getElementById('root')
);