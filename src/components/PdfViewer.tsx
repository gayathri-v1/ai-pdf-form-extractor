"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { FormCtx } from "@/context/FormContext";
import { extractPdf } from "@/services/api";
import { saveFormData , getFormData } from "@/utils/localStorage";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PdfViewer() {
  const { state, dispatch } = useContext(FormCtx);

  const [numPages, setNumPages] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);
  const [pdfWidth, setPdfWidth] = useState(600);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const highlightRef = useRef<HTMLDivElement | null>(null);

  const focusedField = state.fields.find(
    (field) => field.id === state.focusedFieldId
  );

  async function uploadPdf() {
    try {
      dispatch({
        type: "SET_ERROR",
        payload: null,
      });

      dispatch({
        type: "SET_LOADING",
        payload: true,
      });

      const data = await extractPdf();

      dispatch({
        type: "SET_FORM_DATA",
        payload: data,
      });
      saveFormData(data);
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload:
          error instanceof Error ? error.message : "Extraction failed",
      });
    } finally {
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    }
  }
  useEffect(() => {
  const cachedData = getFormData();

  if (cachedData) {
    dispatch({
      type: "SET_FORM_DATA",
      payload: cachedData,
    });
  }
}, [dispatch]);
  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        setPdfWidth(Math.max(300, containerRef.current.clientWidth - 32));
      }
    }

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  function onDocumentLoadSuccess({
    numPages,
  }: {
    numPages: number;
  }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    if (highlightRef.current) {
      highlightRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [focusedField]);

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto p-4"
    >
      <button
        onClick={uploadPdf}
        disabled={state.loading}
        className="mb-4 rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state.loading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Extracting...
          </span>
        ) : (
          "Extract Fields"
        )}
      </button>

      <Document
        file="/sample.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from({ length: numPages }, (_, index) => (
          <div
            key={index}
            className="relative mb-4 w-fit overflow-hidden"
          >
            <Page
              pageNumber={index + 1}
              width={pdfWidth}
              onRenderSuccess={(page) => {
                setPageWidth(page.width);
                setPageHeight(page.height);
              }}
            />

            {focusedField?.page === index + 1 && (
              <div
                ref={highlightRef}
                className="pointer-events-none absolute border-2 border-red-500 bg-red-500/20"
                style={{
                  left:
                    (focusedField.boundingBox.xmin / 1000) * pageWidth,
                  top:
                    (focusedField.boundingBox.ymin / 1000) * pageHeight,
                  width:
                    ((focusedField.boundingBox.xmax -
                      focusedField.boundingBox.xmin) /
                      1000) *
                    pageWidth,
                  height:
                    ((focusedField.boundingBox.ymax -
                      focusedField.boundingBox.ymin) /
                      1000) *
                    pageHeight,
                }}
              />
            )}
          </div>
        ))}
      </Document>
    </div>
  );
}