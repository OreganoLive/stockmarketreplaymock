import React from 'react'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import { Button } from './ui/button'
import { Slider } from './ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

interface ReplayControlsProps {
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
  playbackSpeed: number
  setPlaybackSpeed: (speed: number) => void
  currentIndex: number
  setCurrentIndex: (index: number) => void
  totalDataPoints: number
}

export const ReplayControls: React.FC<ReplayControlsProps> = ({
  isPlaying,
  setIsPlaying,
  playbackSpeed,
  setPlaybackSpeed,
  currentIndex,
  setCurrentIndex,
  totalDataPoints,
}) => {
  return (
    <div className="flex flex-col space-y-4 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentIndex(Math.min(totalDataPoints - 1, currentIndex + 1))}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <span>Speed:</span>
          <Select
            value={playbackSpeed.toString()}
            onValueChange={(value) => setPlaybackSpeed(Number(value))}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Speed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.5">0.5x</SelectItem>
              <SelectItem value="1">1x</SelectItem>
              <SelectItem value="2">2x</SelectItem>
              <SelectItem value="4">4x</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Slider
        value={[currentIndex]}
        max={totalDataPoints - 1}
        step={1}
        onValueChange={(value) => setCurrentIndex(value[0])}
      />
    </div>
  )
}