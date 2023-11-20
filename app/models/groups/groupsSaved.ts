import mongoose from "mongoose";

const saved = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    savedId: mongoose.Types.ObjectId
})
const groupsSaved = mongoose.models.groupsSaved || mongoose.model("groupsSaved", saved)
export default groupsSaved