import File from "../model/file.model.js"

export const uploadFile = async (req, res) => {
    try {
        const fileObj = {
            path: req.file.path,
            name: req.file.originalname
        }
        const file = await File.create(fileObj);
            const fileUrl = `${req.protocol}://${req.get('host')}/files/${req.file.filename}`;
            res.status(200).json({
                success: true,
                path: `${process.env.BASE_URL}/file/${file.id}`,
                message: "File uploaded successfully",
                fileUrl
            })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Internal server error - ${err.message}`
        })
    }
}

export const downloadFile = async (req, res) => {
    try {
        const { fileid } = req.params;
        const file = await File.findById(fileid);
        if (!file) return res.status(404).json({ success: false, message: "File not found" })
        res.status(200).download(file.path, file.name);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Internal server error - ${err.message}`
        })
    }
}