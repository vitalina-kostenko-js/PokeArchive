import { useCallback, useEffect, useState } from 'react'

//interface
interface IUseFormThrottleOptions {
  maxAttempts: number
  lockoutSeconds: number
}

interface IUseFormThrottleReturn {
  isLocked: boolean
  remainingSeconds: number
  attemptsLeft: number
  registerAttempt: () => void
  reset: () => void
}

//hook
export const useFormThrottle = (options: IUseFormThrottleOptions): IUseFormThrottleReturn => {
  const { maxAttempts, lockoutSeconds } = options

  const [attempts, setAttempts] = useState(0)
  const [lockUntil, setLockUntil] = useState<number | null>(null)
  const [remainingSeconds, setRemainingSeconds] = useState(0)

  const isLocked = remainingSeconds > 0

  useEffect(() => {
    if (!lockUntil) return

    const interval = setInterval(() => {
      const left = Math.ceil((lockUntil - Date.now()) / 1000)

      if (left <= 0) {
        setLockUntil(null)
        setAttempts(0)
        setRemainingSeconds(0)
        clearInterval(interval)
      } else {
        setRemainingSeconds(left)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [lockUntil])

  const registerAttempt = useCallback(() => {
    setAttempts((prev) => {
      const next = prev + 1

      if (next >= maxAttempts) {
        setLockUntil(Date.now() + lockoutSeconds * 1000)

        setRemainingSeconds(lockoutSeconds)
      }

      return next
    })
  }, [maxAttempts, lockoutSeconds])

  const reset = useCallback(() => {
    setAttempts(0)
    setLockUntil(null)
    setRemainingSeconds(0)
  }, [])

  //render
  return {
    isLocked,
    remainingSeconds,
    attemptsLeft: Math.max(0, maxAttempts - attempts),
    registerAttempt,
    reset,
  }
}
