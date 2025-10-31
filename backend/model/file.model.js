import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    path:{
        type: String,
        required: true,
        trim : true
    },
    name: {
        type: String,
        required: true
    }
},
{ timestamps: true }
)

const File = mongoose.model("File", fileSchema);
export default File;