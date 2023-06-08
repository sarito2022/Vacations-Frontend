import React from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './Components/Layout/Layout';
import { Provider } from 'react-redux';
import store  from './App/Store';

function App() {
  return (
    <div className="App">
       <Provider store={store}>
          <Layout />
       </Provider>

    </div>
  );
}

export default App;
