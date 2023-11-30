import mongoose from "mongoose";

const Bank = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        require: true,
        immutable: true,
    },
    fullName: {
        type: String,
        require: true,
    },
    upiId: {
        type: String, 
        require: true,
    },
    bankName: {
        type: String,
        require: true,
    },
    bankBranch: {
        type: String,
        require: true,
    },
    accountNumber: {
        type: String,
        require: true,
    },
    IFSC: {
        type: String,
        require: true,
    },
    swift: {
        type: String,
        require: true,
    },
    updatedDate: {
        type: Number,
        require: true,
    },
    createdDate: {
        type: Number,
        require: true,
        immutable: true,
    },
});

const walletBank = mongoose.models.walletBank1 || mongoose.model("walletBank1", Bank);
export default walletBank;