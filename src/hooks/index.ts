import { isAsyncFunction } from '@/utils'
import { useEffect } from 'react'

export function useOnce(
  cb: (stats: {
    /**在async中可以通过这个判断await过后的代码要不要继续执行 */
    readonly isUnmounted: boolean
  }) => void
): void {
  return useEffect(() => {
    let isUnmounted = false
    const state = {
      get isUnmounted() {
        return isUnmounted
      },
    }

    const onUnmount = () => {
      isUnmounted = true
    }

    if (isAsyncFunction(cb)) {
      cb(state)
      return onUnmount
    }

    cb(state)
    return onUnmount
  }, [])
}
