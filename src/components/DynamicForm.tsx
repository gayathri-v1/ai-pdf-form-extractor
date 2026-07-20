import { FormCtx } from "@/context/FormContext";
import { groupFields } from "@/utils/groupFields";
import React, { useContext } from "react";
import { formatDateValue } from "@/utils/formatDate";
export const DynamicForm = () => {
  const { state, dispatch } = useContext(FormCtx);
  const groupedFields = groupFields(state.fields)
  return (
    <form className="space-y-5">
      {state.error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          <p className="font-medium">Extraction failed</p>
          <p>{state.error}</p>
        </div>
      )}
      <h1 className="text-xl font-bold">{state.documentTitle}</h1>

      <p className="text-sm text-gray-500">{state.formTitle}</p>

      <hr className="my-4" />

      <h2 className="text-lg font-semibold">Extracted Fields</h2>
      {Object.entries(groupedFields).map(([section, fields]) => (
  <div key={section} className="space-y-4">

    {section !== "General" && (
      <h3 className="text-md font-semibold border-b pb-2">
        {section}
      </h3>
    )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map((field) => (
          <div
            key={field.id}
            className={`space-y-2 ${
              field.type === "checkbox" ? "md:col-span-2" : ""
            }`}
          >
            {field.type === "checkbox" ? (
  <label
    className="flex items-center gap-3 rounded-lg border border-zinc-300 p-3 cursor-pointer transition hover:bg-zinc-50"
  >
    <input
      type="checkbox"
      checked={Boolean(field.value)}
      onChange={(e) =>
        dispatch({
          type: "UPDATE_FIELD",
          payload: {
            id: field.id,
            value: e.target.checked,
          },
        })
      }
      onFocus={() =>
        dispatch({
          type: "SET_FOCUSED_FIELD_ID",
          payload: field.id,
        })
      }
      className="h-4 w-4"
    />

    <span className="text-sm font-medium text-zinc-700">
      {field.label}
    </span>
  </label>
) : (
  <>
  <label htmlFor={field.id} className="text-sm font-medium text-zinc-700">
    {field.label}
  </label>

  {field.type === "date" ? (
    <div className="space-y-2">
      <p className="text-xs text-zinc-500">
        Extracted: {formatDateValue(String(field.value ?? ""))}
      </p>

      <input
        id={field.id}
        type="date"
        value={formatDateValue(String(field.value ?? ""))}
        onChange={(e) =>
          dispatch({
            type: "UPDATE_FIELD",
            payload: {
              id: field.id,
              value: e.target.value,
            },
          })
        }
        onFocus={() =>
          dispatch({
            type: "SET_FOCUSED_FIELD_ID",
            payload: field.id,
          })
        }
        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </div>
  ) : (
    <input
      id={field.id}
      type={field.type}
      value={String(field.value ?? "")}
      onChange={(e) =>
        dispatch({
          type: "UPDATE_FIELD",
          payload: {
            id: field.id,
            value: e.target.value,
          },
        })
      }
      onFocus={() =>
        dispatch({
          type: "SET_FOCUSED_FIELD_ID",
          payload: field.id,
        })
      }
      className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
    />
  )}
</>
)}
          </div>
        ))}
      </div>
      </div>
      ))}
    </form>
  );
};
