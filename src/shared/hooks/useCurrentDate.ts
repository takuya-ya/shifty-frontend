import { useState, useEffect } from 'react'

export function useCurrentDate(): Date {
  const [currentDate, setCurrentDate] = useState(() => new Date())

  useEffect(() => {
    const now = new Date()
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    const msUntilMidnight = tomorrow.getTime() - now.getTime()

    const timer = setTimeout(() => {
      setCurrentDate(new Date())
    }, msUntilMidnight)

    return () => clearTimeout(timer)
  }, [currentDate])

  return currentDate
}
