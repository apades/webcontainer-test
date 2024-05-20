export type Noop = (...p: any) => any
export type PromiseNoop = (...p: any) => Promise<any>

/**
 * 工具类型
 */

/** 提取重载函数 parameters 和 return，来自 https://github.com/microsoft/TypeScript/issues/32164#issuecomment-1146737709 */
type OverloadUnionRecursive<
  TOverload,
  TPartialOverload = unknown,
> = TOverload extends (...args: infer TArgs) => infer TReturn
  ? // Prevent infinite recursion by stopping recursion when TPartialOverload
    // has accumulated all of the TOverload signatures.
    TPartialOverload extends TOverload
    ? never
    :
        | OverloadUnionRecursive<
            TPartialOverload & TOverload,
            TPartialOverload & ((...args: TArgs) => TReturn)
          >
        | ((...args: TArgs) => TReturn)
  : never

/** 函数重载转联合类型 */
export type OverloadToUnion<TOverload extends (...args: any[]) => any> =
  Exclude<
    OverloadUnionRecursive<
      // The "() => never" signature must be hoisted to the "front" of the
      // intersection, for two reasons: a) because recursion stops when it is
      // encountered, and b) it seems to prevent the collapse of subsequent
      // "compatible" signatures (eg. "() => void" into "(a?: 1) => void"),
      // which gives a direct conversion to a union.
      (() => never) & TOverload
    >,
    TOverload extends () => never ? never : () => never
  >
// Inferring a union of parameter tuples or return types is now possible.
/** 多签名重载函数参数类型 */
export type OverloadParameters<T extends (...args: any[]) => any> = Parameters<
  OverloadToUnion<T>
>
/** 多签名重载函数返回类型 */
export type OverloadReturnType<T extends (...args: any[]) => any> = ReturnType<
  OverloadToUnion<T>
>

/** 函数 */
export type Fn<P extends any[], R = void, This = unknown> = (
  this: This,
  ...args: P
) => R

/** 异步函数 */
export type AsyncFn<Args extends readonly unknown[] = any[], Return = any> = (
  ...args: Args
) => Promise<Awaited<Return>>

export type EnumString<T> = T | (string & {})

/**
 * Represents the completion of an asynchronous operation
 */
export interface Promise2<T, Reject = any> {
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = Reject>(
    onfulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: Reject) => TResult2 | PromiseLike2<TResult2, TResult2>)
      | undefined
      | null
  ): Promise2<TResult1, TResult2>

  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = Reject>(
    onrejected?:
      | ((reason: Reject) => TResult | PromiseLike<TResult>)
      | undefined
      | null
  ): Promise2<T | TResult, Reject>

  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>
}

interface PromiseLike2<T, Reject> {
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = Reject>(
    onfulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: Reject) => TResult2 | PromiseLike2<TResult2, TResult2>)
      | undefined
      | null
  ): PromiseLike2<TResult1 | TResult2, TResult2>
}

export type ExtractByKeys<T, K extends keyof any> = T extends infer R
  ? K extends keyof R
    ? R
    : never
  : never

export type KeyofUnion<T> = T extends infer R ? keyof R : never

export type TransStringValToAny<
  T extends Record<string, any>,
  val = string | number,
> = {
  [K in keyof T]: T[K] extends string ? val : T[K]
}

export type KeyOfType<T, V> = keyof {
  [P in keyof T as T[P] extends V ? P : never]: any
}

export type Shift<T extends any[]> = T extends [any, ...infer U] ? U : never

export type ValueOf<T> = T[keyof T]
