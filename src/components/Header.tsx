import React from 'react'
import { TrendingUp } from 'lucide-react'

export const Header: React.FC = () => {
  return (
    <header className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <TrendingUp className="mr-2" />
          <h1 className="text-2xl font-bold">Stock Market Replay</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-secondary-foreground transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-secondary-foreground transition-colors">About</a></li>
            <li><a href="#" className="hover:text-secondary-foreground transition-colors">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}