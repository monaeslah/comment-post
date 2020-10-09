import {STAR} from 'redux/pages/type';

export function infoListStar(state = [], action) {
    switch (action.type) {
        case STAR:
            let id = action.data
            return !state.includes(id)?[...state,action.data]:state.filter(i=>i!=id)
        default:
            return state;
    }
}
