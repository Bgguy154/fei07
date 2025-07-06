'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import TransactionForm from '@/components/TransactionForm'
import TransactionList from '@/components/TransactionList'
import ExpenseChart from '@/components/ExpenseChart'

export const dynamic = 'force-dynamic';

export default function Home() {
  const [transactions, setTransactions] = useState([])
  const [selected, setSelected] = useState(null)

  const fetchTransactions = async () => {
    const res = await axios.get('/api/transactions')
    setTransactions(res.data)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Personal Finance Tracker</h1>
      <TransactionForm fetchTransactions={fetchTransactions} selected={selected} setSelected={setSelected} />
      <ExpenseChart data={transactions} />
      <TransactionList data={transactions} fetchTransactions={fetchTransactions} setSelected={setSelected} />
    </main>
  )
}
