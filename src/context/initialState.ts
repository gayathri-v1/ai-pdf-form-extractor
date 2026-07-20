import { AppState } from "@/types/state";

export const initialState :AppState = {
    documentTitle:"",
    formTitle:"",
    fields: [],
    focusedFieldId: null,
    loading: false,
    error: null,
}