interface SealMarkProps {
  size?: number
  rotate?: number
  className?: string
}

const SealMark = ({ size = 56, rotate = -4, className = '' }: SealMarkProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <path
        d="M50 4C64 3 78 9 85 22C93 34 92 50 89 63C86 77 78 90 63 94C49 98 33 96 21 87C10 79 4 65 5 50C6 36 12 22 24 13C31 8 41 5 50 4Z"
        fill="#A83A2A"
      />
      <path
        d="M35 32L44 30L47 46L58 28L67 30L54 51L68 70L58 71L48 55L45 72L35 71L40 51Z"
        fill="#EEF0E6"
      />
    </svg>
  )
}

export default SealMark
