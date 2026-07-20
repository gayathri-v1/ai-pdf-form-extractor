import { FormField } from "./form";

export interface AppState{
    documentTitle: string;
    formTitle: string;
    fields :FormField[];
    focusedFieldId: string |null;
    loading: boolean;
    error: string |null;
}