"use client"
import { createContext, useReducer, ReactNode, Dispatch } from "react";
import { reducer } from "@/reducer/formReducer";
import { AppState } from "@/types/state";
import { Action } from "@/types/action";
import { initialState } from "./initialState";

interface FormContextType{
    state:AppState;
    dispatch:Dispatch<Action>;
}
export const FormCtx = createContext<FormContextType>({
    state: initialState,
    dispatch: ()=>{}
})

export function FormCtxProvider({children}:{children:ReactNode}){
    const [state,dispatch] = useReducer(reducer,initialState)

   
    return (
        <FormCtx.Provider value={{state,dispatch}}>
            {children}
        </FormCtx.Provider>
    )
} 
