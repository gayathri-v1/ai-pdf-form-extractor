import { FormField } from "@/types/form";

export function groupFields(fields: FormField[]) {
  return fields.reduce<Record<string, FormField[]>>((acc, field) => {
    const section = field.section || "General";

    if (!acc[section]) {
      acc[section] = [];
    }

    acc[section].push(field);

    return acc;
  }, {});
}