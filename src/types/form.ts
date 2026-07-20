export type FormFieldType =
  | "text"
  | "number"
  | "email"
  | "date"
  | "checkbox";

export interface BoundingBox {
    ymin:number;
    xmin:number;
    ymax:number;
    xmax:number;
}
export interface FormField {
    id:string;
    section:string;
    label:string;
    type:FormFieldType;
    value:string | number | boolean;
    required?: boolean;
    page: number;
    boundingBox : BoundingBox;

}
