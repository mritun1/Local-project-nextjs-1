import mongoose from 'mongoose';

const connectDB = async () =>{
  try{
    if(mongoose.connection.readyState === 0){
      const mongo: any = process.env.MONGODB_URI
      await mongoose.connect(mongo);
      console.log("Mongodb connected")
    }
  }catch (error){
    console.log(error)
  } 
}
export default connectDB;


