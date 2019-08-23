// reducer contains details of user alone

const INITIAL_STATE = {
    currentUser: null
}

// args => prevstate, action
// is prevstate is empty (null is considerded as value), it will take value from INITIAL_STATE (default arg)
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;
