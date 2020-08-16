import {SEARCH_MOVIE} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case SEARCH_MOVIE:
            return {...state, movieResult: action.payload }
        default:
            return state;
         }
    console.log('State at Movie:',state,'Action:',action)
}
//auth통해 전달된 {error:true,isAuth:false}가
//왜 movieReducer에게 전달되는가, redux action/reducer동작 방식 더 확인