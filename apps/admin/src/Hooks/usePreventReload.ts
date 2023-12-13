import { useCallback, useEffect } from 'react'

export const usePreventReload = (isPrenvent: boolean) => {
  const preventReload = useCallback((event: any) => {
    event.preventDefault()
    event.returnValue = ''
  }, [])

  useEffect(() => {
    if (isPrenvent) {
      window.addEventListener('beforeunload', preventReload)
    }
    return () => {
      if (isPrenvent) {
        window.removeEventListener('beforeunload', preventReload)
      }
    }
  }, [isPrenvent, preventReload])
  return {}
}
