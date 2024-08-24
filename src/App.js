import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store'
import MainPage from './pages/main'
import SearchCity from './pages/search'
import { BrowserRouter as Router , Route} from 'react-router-dom'
import 'antd/dist/antd.css'
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={MainPage}></Route>
          <Route exact path="/search" component={SearchCity}></Route>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
