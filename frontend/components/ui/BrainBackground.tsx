import Image from 'next/image'

interface BrainBackgroundProps {
  /** Opacity of the brain image (0–1). Default: 0.22 */
  opacity?: number
  /** Size in px. Default: 680 */
  size?: number
}

/**
 * Full-viewport brain watermark. Uses `fixed` positioning so it always
 * fills the whole screen regardless of page content height.
 * Uses mix-blend-mode: multiply so the white PNG background disappears.
 *
 * Do NOT render this component on dark pages (ReadingShell / game/play).
 */
export function BrainBackground({ opacity = 0.22, size = 680 }: BrainBackgroundProps) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <Image
        src="/brain.png"
        alt=""
        width={size}
        height={size}
        priority
        style={{
          opacity,
          mixBlendMode: 'multiply',
          objectFit: 'contain',
        }}
      />
    </div>
  )
}
