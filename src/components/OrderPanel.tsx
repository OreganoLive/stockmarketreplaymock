import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

interface OrderPanelProps {
  balance: number
  positions: { [symbol: string]: number }
  onBuy: (symbol: string, quantity: number, price: number) => void
  onSell: (symbol: string, quantity: number, price: number) => void
  currentPrice: number
}

export const OrderPanel: React.FC<OrderPanelProps> = ({ balance, positions, onBuy, onSell, currentPrice }) => {
  const [quantity, setQuantity] = useState(1)
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market')
  const [limitPrice, setLimitPrice] = useState(currentPrice)

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value) || 0)
  }

  const handleBuy = () => {
    if (orderType === 'market' || (orderType === 'limit' && currentPrice <= limitPrice)) {
      onBuy('STOCK', quantity, currentPrice)
    } else {
      alert("Limit order not executed: Current price is higher than limit price")
    }
  }

  const handleSell = () => {
    if (orderType === 'market' || (orderType === 'limit' && currentPrice >= limitPrice)) {
      onSell('STOCK', quantity, currentPrice)
    } else {
      alert("Limit order not executed: Current price is lower than limit price")
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Order Panel</h2>
      <div>
        <p>Balance: ${balance.toFixed(2)}</p>
        <p>Current Position: {positions['STOCK'] || 0} shares</p>
        <p>Current Price: ${currentPrice.toFixed(2)}</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="orderType">Order Type</Label>
        <Select value={orderType} onValueChange={(value) => setOrderType(value as 'market' | 'limit')}>
          <SelectTrigger>
            <SelectValue placeholder="Select order type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="market">Market</SelectItem>
            <SelectItem value="limit">Limit</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {orderType === 'limit' && (
        <div className="space-y-2">
          <Label htmlFor="limitPrice">Limit Price</Label>
          <Input
            id="limitPrice"
            type="number"
            value={limitPrice}
            onChange={(e) => setLimitPrice(parseFloat(e.target.value) || 0)}
            step="0.01"
          />
        </div>
      )}
      <div className="flex space-x-2">
        <Button onClick={handleBuy} className="flex-1">Buy</Button>
        <Button onClick={handleSell} variant="secondary" className="flex-1">Sell</Button>
      </div>
    </div>
  )
}