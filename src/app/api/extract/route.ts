import { extractFormFields } from "@/services/gemini";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
   try  {const formData = await request.formData();
    const pdfFile = formData.get("file") as File;




    if(!pdfFile){
        return NextResponse.json(
            {error:"No file received"},
            {status:400}
        )
    }

    const result = await extractFormFields(pdfFile)
    return NextResponse.json(JSON.parse(result))
}
catch {

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