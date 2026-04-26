'use client'

import { Slider } from '@/components/ui/slider'

interface StoryCountPickerProps {
  value: number
  onChange: (value: number) => void
}

const MIN = 3
const MAX = 15

/**
 * Slider that lets the user pick how many stories to read in a session (3–15).
 * Controlled: parent owns the value.
 */
export function StoryCountPicker({ value, onChange }: StoryCountPickerProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-medium">Number of stories</p>
        <span className="text-2xl font-bold tabular-nums">
          {value}
          <span className="text-sm font-normal text-muted-foreground ml-1">
            {value === 1 ? 'story' : 'stories'}
          </span>
        </span>
      </div>

      <Slider
        min={MIN}
        max={MAX}
        step={1}
        value={[value]}
        onValueChange={(values) => {
          const v = Array.isArray(values) ? values[0] : values
          onChange(v)
        }}
        aria-label="Number of stories"
      />

      <div className="flex justify-between text-xs text-muted-foreground select-none">
        <span>{MIN} min</span>
        <span>{MAX} max</span>
      </div>
    </div>
  )
}
