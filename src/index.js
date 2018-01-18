import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import reducer from './Reducers'
import { Provider } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter } from 'react-router-dom'

const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
	<BrowserRouter><Provider store={store}>
		<App />
	</Provider></BrowserRouter>

	, document.getElementById('root'));
registerServiceWorker();
