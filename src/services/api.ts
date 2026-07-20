
export async function extractPdf() {
  const response = await fetch("/sample.pdf");

  if (!response.ok) {
    throw new Error("Unable to load PDF");
  }

  const pdfBlob = await response.blob();

  const formData = new FormData();
  formData.append("file", pdfBlob, "sample.pdf");

  const result = await fetch("/api/extract", {
    method: "POST",
    body: formData,
  });

  if (!result.ok) {
    const error = await result.json();
    throw new Error(error.error);
  }

  return result.json();
}