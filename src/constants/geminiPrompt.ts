export const GEMINI_FORM_EXTRACTION_PROMPT = `
Return ONLY a valid JSON object matching the schema below.

Extract the following from the PDF:

1. documentTitle
- The highest-level document heading displayed at the top of the page.
- Example: "Post Office Savings Bank".
- If no document title exists, return an empty string.

2. formTitle
- The heading immediately below the document title describing the purpose of the form.
- Example: "ATM Card / Internet Banking / SMS Banking Service Request Form".
- Do not include instructions or descriptive paragraphs.
- If no form title exists, return an empty string.

3. fields
- Every editable or interactive field visible in the document.

4. section
- The visible section heading under which the field appears.
- Examples:
  - "Applicant's Name"
  - "ATM Card Required For"
  - "Please provide the below details"
- Do NOT create separate field objects for section headings.
- Instead, include the heading as the "section" property for every field that belongs to it.
- If a field does not belong to any visible section heading, return an empty string ("").
- Do NOT invent or infer section names that are not explicitly visible in the PDF.

Return JSON in exactly this format:

{
  "documentTitle": "",
  "formTitle": "",
  "fields": [
    {
      "id": "",
      "section": "",
      "label": "",
      "type": "text",
      "value": "",
      "required": false,
      "page": 1,
      "boundingBox": {
        "xmin": 0,
        "ymin": 0,
        "xmax": 0,
        "ymax": 0
      }
    }
  ]
}

Extraction Rules:

- Extract EVERY interactive field, even if it has no value.
- Do NOT omit empty fields.
- Do NOT infer or invent fields that are not visible in the PDF.
- Every visible interactive field must appear exactly once.
- Every field must include a "section" property.
- Consecutive fields belonging to the same visible section must have the same section value.
- Preserve the visual grouping of the original form.
- Return fields in the same visual order they appear in the PDF (top-to-bottom, then left-to-right).

Checkbox & Radio Button Rules:

If a checkbox or radio button group is present, return EVERY option individually, whether selected or not.

Example:

[
  {
    "id": "atm_self",
    "section": "ATM Card Required For",
    "label": "Self",
    "type": "checkbox",
    "value": true
  },
  {
    "id": "atm_joint_b",
    "section": "ATM Card Required For",
    "label": "Joint B Account Holder",
    "type": "checkbox",
    "value": false
  },
  {
    "id": "atm_not_required",
    "section": "ATM Card Required For",
    "label": "Not Required",
    "type": "checkbox",
    "value": false
  }
]

Include:

- Filled text fields
- Empty text fields
- Checkboxes (checked and unchecked)
- Radio buttons (selected and unselected)
- Dates
- Numbers
- Account numbers
- Phone numbers
- Email addresses

Do NOT include inside the fields array:

- documentTitle
- formTitle
- Logos
- Paragraphs
- Instructions
- Decorative text
- Standalone section headings (they should only appear as the "section" property of related fields)
- Non-editable labels that are not associated with an input

Field Rules:

- id must be unique.
- id must use snake_case.
- label must exactly match the visible label shown in the PDF.
- section must exactly match the visible section heading.
- page numbering starts from 1.
- required must be true only if the form explicitly marks the field as mandatory (for example using * or the word "Required"). Otherwise return false.

type must be exactly one of:

- text
- number
- email
- date
- checkbox

Value Rules:

- Text fields → extracted text.
- Empty text fields → "".
- Number fields → preserve the visible value exactly as shown.
- Date fields → preserve the visible value exactly as shown.
- Checkbox → true or false.
- Radio button → true or false.

Bounding Box Rules:

- Return NORMALIZED coordinates.
- Use a coordinate system where:
  - Top-left of the page is (0,0)
  - Bottom-right of the page is (1000,1000)
- xmin, ymin, xmax and ymax must be integers between 0 and 1000.
- Return exactly one bounding box for every field.
- The bounding box must tightly enclose the complete interactive field, including BOTH the visible label and its associated input control.

Return ONLY valid JSON.

Do NOT return Markdown.
Do NOT wrap the response in triple backticks.
Do NOT include explanations, notes, comments or any additional text outside the JSON object.
`;