import mongoose from "mongoose"

const connectDB = async() => {
  try {
      await mongoose.connect("mongodb+srv://mritun1:1234567890@localniitest.fnztgye.mongodb.net/")
    console.log("Mongodb Connected")
  } catch (error) {
    console.log(error)
  }
}

export default connectDB