export const UploadFile = async (fileData) => {
    try {
        const response = await fetch("http://localhost:10000/api/v1/upload", {
            method: 'POST',
            body: fileData
        })
        return response.json();
    } catch (err) {
        console.log(`Error while uploading file - ${err.message}`);
    }
}