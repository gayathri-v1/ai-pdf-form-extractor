import {GoogleGenAI} from '@google/genai'
import { GEMINI_FORM_EXTRACTION_PROMPT } from "@/constants/geminiPrompt";
export const ai = new GoogleGenAI(
    {
        apiKey: process.env.GOOGLE_API_KEY!,
    }
)
export async function extractFormFields(pdfFile:File){
    const bytes = await pdfFile.arrayBuffer()
    const base64 = Buffer.from(bytes).toString("base64")

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        {
          inlineData: {
            mimeType: "application/pdf",
            data: base64,
          },
        },
        {
        text: GEMINI_FORM_EXTRACTION_PROMPT,
        },
      ],
      config: {
        responseMimeType: "application/json"
      }
    });

    if (!response.text) {
  throw new Error("Gemini returned an empty response.");
}

return response.text;
}