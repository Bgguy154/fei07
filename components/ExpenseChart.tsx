'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function ExpenseChart({ data }: any) {
  const monthly = data.reduce((acc: any, tx: any) => {
    const month = new Date(tx.date).toLocaleString('default', { month: 'short' })
    acc[month] = (acc[month] || 0) + Number(tx.amount)
    return acc
  }, {})

  const chartData = Object.entries(monthly).map(([month, total]) => ({ month, total }))

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
