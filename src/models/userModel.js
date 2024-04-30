import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },
    email:{
        type: String,
        require: [true, "please provide your Email"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "please provide a password"],
    },
    isVarified: {
        type: Boolean,
        dafault: false
    },
    isAdmin: {
        type: Boolean,
        dafault: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken :String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User;