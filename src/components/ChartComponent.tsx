import React, { useRef, useEffect, useState } from 'react'
import { createChart, IChartApi, CandlestickData } from 'lightweight-charts'
import { StockData } from '../types'

interface ChartComponentProps {
  data: StockData[]
}

export const ChartComponent: React.FC<ChartComponentProps> = ({ data }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const [hoveredData, setHoveredData] = useState<CandlestickData | null>(null)

  useEffect(() => {
    if (chartContainerRef.current) {
      const handleResize = () => {
        if (chartRef.current) {
          chartRef.current.applyOptions({ width: chartContainerRef.current!.clientWidth })
        }
      }

      chartRef.current = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 400,
        layout: {
          background: { type: 'solid', color: 'transparent' },
          textColor: 'rgba(255, 255, 255, 0.9)',
        },
        grid: {
          vertLines: { color: 'rgba(197, 203, 206, 0.2)' },
          horzLines: { color: 'rgba(197, 203, 206, 0.2)' },
        },
        crosshair: {
          mode: 0,
        },
        rightPriceScale: {
          borderColor: 'rgba(197, 203, 206, 0.8)',
        },
        timeScale: {
          borderColor: 'rgba(197, 203, 206, 0.8)',
        },
      })

      const candlestickSeries = chartRef.current.addCandlestickSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
      })

      candlestickSeries.setData(data.map(item => ({
        time: item.date,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
      })))

      chartRef.current.subscribeCrosshairMove((param) => {
        if (param.time) {
          const dataPoint = param.seriesData.get(candlestickSeries) as CandlestickData
          setHoveredData(dataPoint)
        } else {
          setHoveredData(null)
        }
      })

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        if (chartRef.current) {
          chartRef.current.remove()
        }
      }
    }
  }, [data])

  return (
    <div>
      <div ref={chartContainerRef} className="w-full h-[400px]" />
      {hoveredData && (
        <div className="mt-2 text-sm">
          <p>Open: {hoveredData.open.toFixed(2)}</p>
          <p>High: {hoveredData.high.toFixed(2)}</p>
          <p>Low: {hoveredData.low.toFixed(2)}</p>
          <p>Close: {hoveredData.close.toFixed(2)}</p>
        </div>
      )}
    </div>
  )
}