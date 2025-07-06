'use client'
import { useState,useEffect } from 'react'
import axios from 'axios'

export default function TransactionForm({ fetchTransactions, selected, setSelected }: any) {
  const [form, setForm] = useState(selected || { description: '', amount: '', date: '' })

   // Update form when "Edit" is clicked
  useEffect(() => {
    if (selected) {
      setForm({
        ...selected,
        date: selected.date?.substring(0, 10), // format for <input type="date">
      })
    }
  }, [selected])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!form.description || !form.amount || !form.date) return alert('All fields required!')

        try{
    if (form._id) {
      await axios.put('/api/transactions', form)
    } else {    
      await axios.post('/api/transactions', form)
    }

    setForm({ description: '', amount: '', date: '' })
    setSelected(null)
    fetchTransactions()
  } catch(error){
    alert('Error saving transaction')
  }
}

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded-xl">
      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        value={form.date?.substring(0, 10)}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {form._id ? 'Update' : 'Add'}
      </button>
    </form>
  )
}
