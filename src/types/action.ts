import { FormField } from "./form";

export type Action = 
{
    type: "SET_LOADING";
    payload:boolean;
}
|
{
    type: "SET_ERROR";
    payload: string | null;
}
|
{
    type: "SET_FOCUSED_FIELD_ID";
    payload: string | null;
}
|
{
    type: "SET_FORM_DATA";
    payload:
    { documentTitle: string;
    formTitle: string;
    fields: FormField[];
    }
}
|
{
  type: "UPDATE_FIELD";
  payload: {
    id: string;
    value: string | number | boolean;
  };
}