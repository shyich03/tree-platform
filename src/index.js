import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./Routes";
import './index.css';
import App from './App';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './store/reducers/auth';
import {loadState, saveState} from './localstorage'
import persistStore from 'redux-persist/es/persistStore';
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const persistedState = loadState()
const store = createStore(
  reducer,
  persistedState,
  composeEnhances(
    applyMiddleware(thunk)
  )
)
store.subscribe(()=>{
  saveState(store.getState());
})
// console.log(store);
const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


ReactDOM.render(app, document.getElementById('root'));
