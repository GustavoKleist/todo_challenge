//REACT
import React from "react";
//REDUX
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
//REDUCERS
import AuthorizationReducer from "./authorization/authorizationReducer";
import ProjectReducer from "./project/projectReducer";
//ROUTER
import RouterSwitch from "./router/router";
//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.css'

const reducers = combineReducers({
  authorization: AuthorizationReducer,
  project: ProjectReducer
});

const store = createStore(reducers);

function App() {
  return (
    <Provider store={store}>
      <RouterSwitch />
    </Provider>
  );
}

export default App;
