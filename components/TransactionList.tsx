'use client'
import axios from 'axios'

export default function TransactionList({ data, fetchTransactions, setSelected }: any) {
  const handleDelete = async (_id: string) => {
    await axios.delete('/api/transactions', { data: { _id } })
    fetchTransactions()
  }

  return (
    <ul className="divide-y mt-4">
      {data.map((tx: any) => (
        <li key={tx._id} className="flex justify-between items-center py-2">
          <div>
            <div className="font-medium">{tx.description}</div>
            <div className="text-sm text-gray-500">
              ₹{tx.amount} — {new Date(tx.date).toLocaleDateString()}
            </div>
          </div>
          <div className="space-x-2">
            <button onClick={() => setSelected(tx)} className="text-blue-600">Edit</button>
            <button onClick={() => handleDelete(tx._id)} className="text-red-600">Delete</button>
          </div>
        </li>
      ))}
    </ul>
  )
}
