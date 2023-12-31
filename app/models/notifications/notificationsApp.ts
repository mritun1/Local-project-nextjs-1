import mongoose from "mongoose";

const notifications = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId
    },
    notificationType: {
        type: String /** wallet, settings, profile, my-secondhand, my-posts */
    },
    message: String,
    active: {
        type: Number,
        default: 0 /** 0 or 1 */
    },
    updatedDate: {
        type: Number,
        default: Date.now()
    }
})

let notificationsApp = mongoose.models.notificationsApp || mongoose.model('notificationsApp', notifications)
export default notificationsApp