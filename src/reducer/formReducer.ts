import { Action } from "@/types/action"
import { AppState } from "@/types/state"

export function reducer(state:AppState,action:Action){
    switch(action.type){
        case "SET_LOADING":
        return{
            
                ...state,
                loading: action.payload
            }
            case "SET_ERROR":
                return{
                    ...state,
                    error: action.payload
                }
            case "SET_FOCUSED_FIELD_ID":
                return{
                    ...state,
                    focusedFieldId: action.payload
                }
            case "SET_FORM_DATA":
                return {
                    ...state,
                    documentTitle: action.payload.documentTitle,
                    formTitle: action.payload.formTitle,
                    fields: action.payload.fields,
                }
                case "UPDATE_FIELD":
                return {
                    ...state,
                    fields: state.fields.map((field) =>
                    field.id === action.payload.id
                        ? {
                            ...field,
                            value: action.payload.value,
                        }
                        : field
                    ),
                };
        
        default:
            return state
    }
}