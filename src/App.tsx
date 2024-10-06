import React, { useState, useEffect } from 'react'
import { ChartComponent } from './components/ChartComponent'
import { OrderPanel } from './components/OrderPanel'
import { HistoricalData } from './components/HistoricalData'
import { Header } from './components/Header'
import { ReplayControls } from './components/ReplayControls'
import { StockData } from './types'
import { mockStockData } from './mockData'
import { ThemeProvider } from './components/ThemeProvider'
import { Button } from './components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from './components/ThemeProvider'

function App() {
  const [currentData, setCurrentData] = useState<StockData[]>(mockStockData)
  const [balance, setBalance] = useState(10000)
  const [positions, setPositions] = useState<{ [symbol: string]: number }>({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && currentIndex < mockStockData.length - 1) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= mockStockData.length) {
            setIsPlaying(false);
            return prevIndex;
          }
          return nextIndex;
        });
      }, 1000 / playbackSpeed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentIndex, playbackSpeed]);

  const handleBuy = (symbol: string, quantity: number, price: number) => {
    const cost = quantity * price
    if (balance >= cost) {
      setBalance(prevBalance => prevBalance - cost)
      setPositions(prevPositions => ({
        ...prevPositions,
        [symbol]: (prevPositions[symbol] || 0) + quantity
      }))
    } else {
      alert("Insufficient funds")
    }
  }

  const handleSell = (symbol: string, quantity: number, price: number) => {
    if (positions[symbol] >= quantity) {
      const revenue = quantity * price
      setBalance(prevBalance => prevBalance + revenue)
      setPositions(prevPositions => ({
        ...prevPositions,
        [symbol]: prevPositions[symbol] - quantity
      }))
    } else {
      alert("Insufficient shares")
    }
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className={`min-h-screen bg-background text-foreground transition-colors duration-300 ${theme === 'dark' ? 'dark' : ''}`}>
        <Header />
        <div className="container mx-auto p-4">
          <div className="flex justify-end mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 glassmorphic p-4">
              <ChartComponent data={currentData.slice(0, currentIndex + 1)} />
              <ReplayControls
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                playbackSpeed={playbackSpeed}
                setPlaybackSpeed={setPlaybackSpeed}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                totalDataPoints={mockStockData.length}
              />
            </div>
            <div className="glassmorphic p-4">
              <OrderPanel
                balance={balance}
                positions={positions}
                onBuy={handleBuy}
                onSell={handleSell}
                currentPrice={currentData[currentIndex]?.close || 0}
              />
            </div>
          </div>
          <div className="mt-4 glassmorphic p-4">
            <HistoricalData data={currentData.slice(0, currentIndex + 1)} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App