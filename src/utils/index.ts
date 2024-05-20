export function isAsyncFunction(
  fn: Function
): fn is (...arg: any) => Promise<any> {
  return (fn as any).__proto__.constructor.toString().includes('AsyncFunction')
}

export * from './client/dom'
