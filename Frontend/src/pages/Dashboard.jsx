import { useState } from "react";
export default function Dashboard() {
  const [pdfUrl, setPdfUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = e.target.url.value;
    setPdfUrl(url);
  };

  return (
    <div>
      <h2>Cloudinary PDF Viewer Test</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="url"
          placeholder="Paste Cloudinary PDF URL here"
          style={{ width: "400px" }}
        />
        <button type="submit">Show PDF</button>
      </form>

      {pdfUrl && (
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          title="PDF"
          style={{ marginTop: "20px", border: "1px solid #ccc" }}
        />
      )}
    </div>
  );
}
