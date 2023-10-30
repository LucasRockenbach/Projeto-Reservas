import React, { createContext, useReducer } from 'react';

const initialState = {}
const UserContext = createContext({})

const actions = {
    selectUser(state, action){
        const userReceveid = action.payload
        return{
            ...state,
            users: userReceveid
        }
    },
}

export const UserProvider = props => {
    function reducer(state, action){
        const fn = actions[action.type]

        return fn ? fn(state, action) : state
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <UserContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext