import mongoose from 'mongoose';

const connectDB = async ()=>{
    try {
         mongoose.connection.on('connected',()=>{
            console.log('Database connected successfully')
        });
         await mongoose.connect(`${process.env.MONGO_URL}/backend`)
    } catch (error) {
        console.log(error)
    }
}
export default connectDB;
