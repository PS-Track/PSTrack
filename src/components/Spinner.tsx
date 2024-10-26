import { ImSpinner2 } from 'react-icons/im'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
  xl: 'w-20 h-20',
}

export default function Spinner({ size = 'sm' }: SpinnerProps) {
  return <ImSpinner2 className={`animate-spin duration-500 ${sizeClasses[size]}`} />
}
