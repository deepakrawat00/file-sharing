import { Children, useEffect, useRef, useState } from "react"
import { UploadFile } from "./services/api.js";

function App() {
  const [file, setFile] = useState(null);
  const uploadRef = useRef();
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (!uploadedUrl) return;
    try {
      await navigator.clipboard.writeText(uploadedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const ta = document.createElement('textarea');
      ta.value = uploadedUrl;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        console.error('Copy failed', e);
      }
      document.body.removeChild(ta);
    }
  }

  const handleUpload = async () => {
    uploadRef.current.click();
  }
  useEffect(() => {
    const apiCall = async () => {
      if (file) {
        const fileData = new FormData();
        fileData.append("name", file.name);
        fileData.append("file", file)
        const response = await UploadFile(fileData);
        console.log("Response from Api", response);
        if (response && response.path) {
          setUploadedUrl(response.path);
        } else {
          setUploadedUrl(null);
        }
      }
    }
    apiCall();
  }, [file])

  return (
    <>
      <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-5xl font-extrabold">File Sharing App</h1>
        <div className="mt-5 flex flex-col items-center gap-3">
          <input type="file" ref={uploadRef} onChange={(e) => setFile(e.target.files[0])} className="hidden" />
          <button onClick={() => { handleUpload() }} className="bg-gray-400 py-3 cursor-pointer px-5 font-bold rounded-xl">Upload File</button>
          {uploadedUrl && (
            <div className="w-full flex flex-col items-center gap-2">
              <div className="w-full border mt-3.5 rounded py-1.5 px-2 text-gray-300 flex items-center justify-between gap-3">
                <a href={uploadedUrl} className="underline break-all text-sm" target="_blank" rel="noreferrer">{uploadedUrl}</a>
                <div className="flex items-center gap-2">
                  <button onClick={copyToClipboard} className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-sm">Copy URL</button>
                  {copied && <span className="text-green-400 text-sm">Copied!</span>}
                </div>
              </div>
              <div>
                <a href={uploadedUrl} target="_blank" rel="noreferrer" className="text-blue-400 underline">Open uploaded file</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App