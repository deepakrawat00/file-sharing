export const UploadFile = async (fileData) => {
    try {
        const response = await fetch("https://file-sharing-xx3h.onrender.com/api/v1/upload", {
            method: 'POST',
            body: fileData
        })
        return response.json();
    } catch (err) {
        console.log(`Error while uploading file - ${err.message}`);
    }
}
