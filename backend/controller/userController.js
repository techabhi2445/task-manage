import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';


export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Details are missing", success: false });
    }
    try {
        const exitUser = await userModel.findOne({ email });
        if (exitUser) {
            return res.status(400).json({ message: "User already exists", success: false })
        }
        const passOK = await bcrypt.hash(password, 10);
        const newData = new userModel({ name, email, password: passOK });
        await newData.save();
        
        const token = JWT.sign({ userId: newData._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.status(201).json({ message: "User Registered Successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }

}
export const login = async(req,res)=>{
    const{email,password}= req.body;
    if(!email || !password){
        return res.status(400).json({message:"Email and Password are required",success:false});

    }
    try {
        const exitUser = await userModel.findOne({email});
        if(!exitUser){
            return res.status(400).json({message:"User does not exist",success:false});
        }
        const passOk = await bcrypt.compare(password,exitUser.password);
        if(!passOk){
            return res.status(400).json({message:"Invalid Password",success:false});
        }
        const token = JWT.sign({userId:exitUser._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production'?'none' :'strict',
            maxAge:7*24*60*60*1000 // 7 days
        });
        res.status(200).json({message:"User Logged In Successfully",success:true});
    } catch (error) {
        res.status(500).json({message:error.message,success:false});
    }
}
export const allUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).json({ User:users, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}   
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        res.status(200).json({ message: "User Logged Out Successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}
