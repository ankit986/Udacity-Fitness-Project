import { RECIEVE_ENTRIES, ADD_ENTRY } from '../actions/entry'

export default function entries(state = {}, action) {
    switch (action.type) {
        case RECIEVE_ENTRIES:
            return {
                ...state,
                ...action.entries
            }
        case ADD_ENTRY:
            return {
                ...state,
                ...action.entry
            }
        default:
            return state
    }
}