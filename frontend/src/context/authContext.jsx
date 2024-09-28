
import { createContext, useEffect, useReducer, } from "react";

const initialState={
    user:localStorage.getItem("user") !== undefined ? JSON.parse(localStorage.getItem("user")):null,
    role:localStorage.getItem("role") || null,
    token:localStorage.getItem("token") || null,
}

export const AuthContext=createContext({initialState})

const authReducer=(state,action)=>{
    switch (action.type) {
        case "LOGIN_START":
            return{
                user:null,
                role:null,
                token:null
            }
           
            case "LOGIN_SUCCESS":
                return{
                    user:action.payload.user,
                    role:action.payload.role,
                    token:action.payload.token
                } 

                case "LOGOUT":
                    return{
                        user:null,
                        role:null,
                        token:null
                    }

                    case "UPDATE_USER":
                return{
                    user:action.payload.user,
                    role:action.payload.role,
                    token:action.payload.token
                } 
    
        default:
            state;
    }
}

const AuthContextProvider=(props)=>{
    const [state, dispatch] = useReducer(authReducer,initialState)
    useEffect(() => {
     localStorage.setItem("user",JSON.stringify(state.user))
     localStorage.setItem("role",state.role)
     localStorage.setItem("token",state.token)
    }, [state])
    

    const value={
       user:state.user,
       role:state.role,
       token:state.token,
       dispatch
    }

    return(
        <AuthContext.Provider value={value}>
           {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
