import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3, maxlength: 200,
        required: true,
    },
    content: {
        type: String,
        minlength: 50,
        required: true,
    },
    excerpt: {
        type: String,
        maxlength: 500,
        required: false,
    },
    status: {
        type: String,
        enum: ['published', 'archived'],
        default: 'published',
    },
    author: {},
    tags: {},
},{
    timestamps: true,
});

export const articleModel = mongoose.model("Article", articleSchema);