import mongoose from "mongoose";

const notifications = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId
    },
    sendType:{
        type:String /* all,one,oneToOne */
    },
    senderId: {
        type: mongoose.Types.ObjectId
    },
    senderPic: String,
    senderName: String,
    notificationType:{
        type: String /** wallet, message, settings, profile, my-secondhand, my-posts */
    },
    message: String,
    seen:{
        type:Boolean,
        default:false 
    },
    createdDate:{
        type:Number,
        default:Date.now()
    }
})

let notificationsMain = mongoose.models.notificationsMain || mongoose.model('notificationsMain', notifications)
export default notificationsMain