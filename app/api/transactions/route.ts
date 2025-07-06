import { connectDB } from '@/lib/db'
import { Transaction } from '@/lib/models/transactions'

export async function GET() {
  await connectDB()
  const transactions = await Transaction.find()
  return Response.json(transactions)
}

export async function POST(req: Request) {
  await connectDB()
  const data = await req.json()
  const transaction = await Transaction.create(data)
  return Response.json(transaction)
}

export async function PUT(req: Request) {
  await connectDB()
  const { _id, ...rest } = await req.json()
  const transaction = await Transaction.findByIdAndUpdate(_id, rest, { new: true })
  return Response.json(transaction)
}

export async function DELETE(req: Request) {
  await connectDB()
  const { _id } = await req.json()
  await Transaction.findByIdAndDelete(_id)
  return Response.json({ success: true })
}
