import mongoose from "mongoose";

const groups = new mongoose.Schema({
    groupName: String,
    groupPic: String,
    groupPin: Number,
    groupCreatorId: String,
    groupMembers: [],
    updatedDate: {
        type: Number,
        default: Date.now()
    },
    createdDate: {
        type: Number,
        default: Date.now()
    }
})
const groupsModelsDraft = mongoose.models.groupsModelsDraft1 || mongoose.model("groupsModelsDraft1", groups)
export default groupsModelsDraft