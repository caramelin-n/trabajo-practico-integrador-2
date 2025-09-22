import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    
    firstName: {
        type: String,
        minlength: 2, maxlength: 50,
        required: true
    },
    lastName: {
        type: String,
        minlength: 2, maxlength: 50,
        required: true
    },
    biography: {
        type: String,
        maxlength: 500,
        required: false,
    },
    avatarUrl: {
        type: String,
        match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i],
        required: false,
    },
    birthDate: {
        type: Date,
        required: false,
    }
},{_id: false})

const userSchema = new mongoose.Schema({
    username: { type: String,
        minlength: 2, maxlength: 20,
        unique: true,
        required: true,
     },
     email: {
        type: String,
        unique: true,
        match: /.+\@.+\..+/,
        required: true,
     },
     password: {
        type: String,
        required: true,
     },
     role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true,
     },
     profile: profileSchema,
     deletedAt: {
        type: Date,
        required: false,
        default: null,
     }
},{
    versionKey: false,
    timestamps: true
});

export const userModel = mongoose.model("User", userSchema);