import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const FilePreview = ({ file, setFile }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  if (!file || !previewUrl) return null;

  return (
    <div className="absolute top-0 left-0 right-0 bottom-15 z-50 flex items-center justify-center bg-black/50">
      
      {/* Close Button */}
      <button
        onClick={() => setFile(null)}
        className="absolute top-4 right-4 bg-white rounded-full p-1 shadow-lg hover:scale-110 transition"
      >
        <IoClose size={28} />
      </button>

      {/* Image Preview */}
      {file.type.startsWith("image/") && (
        <div className="w-[80%] h-[80%] flex items-center justify-center">
          <img
            src={previewUrl}
            alt="preview"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}

      {/* PDF Preview */}
      {file.type === "application/pdf" && (
        <iframe
          src={previewUrl}
          title="PDF Preview"
          className="w-[80%] h-[80%] rounded-lg bg-white shadow-2xl"
        />
      )}
    </div>
  );
};

export default FilePreview;