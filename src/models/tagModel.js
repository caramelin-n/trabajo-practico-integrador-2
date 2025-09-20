import mongoose from "mongoose";

//required agregados en cada campo para mejor interpretación.

const tagSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        minlength: 2, maxlength: 30,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
},{
    timestamps: true
})

export const tagModel = mongoose.model("Tag", tagSchema);