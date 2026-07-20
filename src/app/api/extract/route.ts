import { extractFormFields } from "@/services/gemini";
import { FormSchema } from "@/schema/formSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const pdfFile = formData.get("file") as File;

    if (!pdfFile) {
      return NextResponse.json(
        { error: "No file received" },
        { status: 400 }
      );
    }

    const result = await extractFormFields(pdfFile);

    const parsed = JSON.parse(result);

    const validated = FormSchema.safeParse(parsed);

    if (!validated.success) {
      return NextResponse.json(
        {
          error: "Invalid AI response",
          details: validated.error.flatten(),
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(validated.data);
  } catch {
    return NextResponse.json(
      {
        error:
          "Gemini is currently busy. Please try again in a few moments.",
      },
      {
        status: 503,
      }
    );
  }
}