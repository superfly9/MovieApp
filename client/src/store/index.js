import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import rootReducer from '../_reducers/index';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';


const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

export const store = createStoreWithMiddleware(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const persistor = persistStore(store);
export default { store, persistor };
