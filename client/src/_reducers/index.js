import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//localStorage사용
import user from './user_reducer';
import movie from './movie_reducer';


const persistConfig = {
    key : 'root',
    storage
}

const rootReducer = combineReducers({
    user,movie
});

export default persistReducer(persistConfig,rootReducer);