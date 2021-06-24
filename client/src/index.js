import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from './providers/StateProvider';
import reducer ,{initialState} from './reducers/reducer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faCheckCircle, faEdit, faPlusCircle ,faTasks,faTrashAlt,faWrench} from '@fortawesome/free-solid-svg-icons';

library.add(faPlusCircle,faCheckCircle,faWrench,faTasks,faEdit,faTrashAlt,faArrowRight);

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState ={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState ={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
