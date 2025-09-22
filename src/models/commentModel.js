import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        minlength: 2, maxlength: 500,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    article: {
        type: mongoose.Schema.Types.ObjectId, ref: "Article"
    },
},{
    timestamps: true,
})

export const commentModel = mongoose.model("Comment", commentSchema);