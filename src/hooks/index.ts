import { useEffect, useState } from 'react'

export const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounceValue(value), delay)

    return () => clearTimeout(id)
  }, [value, delay])

  return debounceValue
}
