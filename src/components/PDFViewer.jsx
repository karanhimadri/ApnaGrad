"use client";
export default function PDFViewer({ src }) {
  // Simple in-browser PDF viewer via iframe; replace with better viewer later
  return (
    <div className="w-full h-[70vh] border border-black/10 rounded">
      <iframe src={src} className="w-full h-full" title="PDF Viewer" />
    </div>
  );
}
