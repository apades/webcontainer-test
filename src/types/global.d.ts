import type { Language } from '@/utils/lang'

declare global {
  interface Window {
    onLocalStorageError: () => void
    isLocalStorageError: boolean
    gtag: (e: 'event', ...args: string[]) => void
    [key: string]: any
  }
}

type Props<P = string, SP = string> = {
  params: {
    [key in P]: string
  } & {
    locale: Language
  }
  // searchParams: {
  //   [key in SP]: string
  // }
}
declare module 'react' {
  /**
   * Server layout function component
   *
   * 传入第一个为params type，第二个为searchParams，传入union格式'a' | 'b'
   *  */
  export type SFC<P = string, SP = string> = {
    (props: Props<P, SP>, context?: any): ReactNode | Promise<ReactNode>
  }

  /**Server layout function component */
  export type SLFC<P = string, SP = string> = {
    (
      props: Props<P, SP> & {
        children?: ReactNode
      },
      context?: any
    ): ReactNode | Promise<ReactNode>
  }
}

declare module 'next' {
  export type GenerateMetadata = {
    (props: Props<P, SP>): Metadata | Promise<Metadata>
  }
}
export {}
