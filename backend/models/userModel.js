import mongoose from "mongoose";    
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,                
    },
    password:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

const userModel = mongoose.models.candidate || mongoose.model('candidate', userSchema);

export default userModel;

      
