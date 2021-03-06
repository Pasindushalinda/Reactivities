import ReactDOM from 'react-dom';
import "./app/layouts/styles.css";
import App from './app/layouts/App';
import reportWebVitals from './reportWebVitals';
import 'react-widgets/dist/css/react-widgets.css';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ScrollToTop from '../src/app/layouts/ScrollToTop';
import 'react-toastify/dist/ReactToastify.min.css';
import dateFnsLocalizer from 'react-widgets-date-fns';

dateFnsLocalizer();
export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </Router>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
