import state from '../state';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';
import {createStore, applyMiddleware} from 'redux';

const configureStore = () => {
  return createStore(reducers, state, applyMiddleware(thunk));
};
export default configureStore;
