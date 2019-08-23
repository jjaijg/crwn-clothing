// actions are function that retuns object

export const setCurrentUser = user => (
    {
        type: 'SET_CURRENT_USER',
        payload: user
    }
)