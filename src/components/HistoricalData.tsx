import React from 'react'
import { StockData } from '../types'
import { format } from 'date-fns'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

interface HistoricalDataProps {
  data: StockData[]
}

export const HistoricalData: React.FC<HistoricalDataProps> = ({ data }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Historical Data</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Open</TableHead>
              <TableHead>High</TableHead>
              <TableHead>Low</TableHead>
              <TableHead>Close</TableHead>
              <TableHead>Volume</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.slice().reverse().map((item, index) => (
              <TableRow key={index}>
                <TableCell>{format(new Date(item.date), 'MM/dd/yyyy')}</TableCell>
                <TableCell>{item.open.toFixed(2)}</TableCell>
                <TableCell>{item.high.toFixed(2)}</TableCell>
                <TableCell>{item.low.toFixed(2)}</TableCell>
                <TableCell>{item.close.toFixed(2)}</TableCell>
                <TableCell>{item.volume.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}