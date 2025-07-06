import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  date: Date,
})

export const Transaction =
  mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema)
