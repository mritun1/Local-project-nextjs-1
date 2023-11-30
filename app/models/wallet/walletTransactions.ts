import mongoose from "mongoose";

const WalTransactionSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        require:true,
        immutable:true,
    },
    slId: {
        type: Number,
        require: true,
        immutable: true,
    },
    transactionType: {
        type: String, //Add/Received/Withdrawn/Sent
        require: true,
        immutable: true,
    },
    prevAmount: {
        type: Number,
        require: true,
        immutable: true,
    },
    myPrevSlId: {
        type: Number,
        require: true,
        immutable: true,
    },
    senderPrevSlId: {
        type: Number,
        immutable: true,
    },
    Amount: {
        type: Number,
        immutable: true,
    },
    journal: {
        type: String,
        immutable: true,
    },
    currentBal: {
        type: Number,
        require: true,
        immutable: true,
    },
    status: {
        type: String, //Pending, Success, Rejected
        require: true,
    },
    createdDate: {
        type: Number,
        require: true,
        immutable: true,
    },
});

const walletTransactions = mongoose.models.walletTransactions2 || mongoose.model("walletTransactions2",WalTransactionSchema);
export default walletTransactions;