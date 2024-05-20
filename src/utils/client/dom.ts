import { ValueOf } from 'next/dist/shared/lib/constants'

export const dq: {
  <K extends keyof HTMLElementTagNameMap>(
    selectors: K,
    tar?: Document | ValueOf<HTMLElementTagNameMap> | Element
  ): HTMLElementTagNameMap[K][]
  <K extends keyof SVGElementTagNameMap>(
    selectors: K,
    tar?: Document | ValueOf<SVGElementTagNameMap> | Element
  ): SVGElementTagNameMap[K][]
  <K extends keyof MathMLElementTagNameMap>(
    selectors: K,
    tar?: Document | ValueOf<MathMLElementTagNameMap> | Element
  ): MathMLElementTagNameMap[K][]
  <E extends Element = HTMLDivElement>(
    selectors: string,
    tar?: Document | Element
  ): E[]
} = (selector: string, tar = window.document as any) => {
  return Array.from(tar.querySelectorAll(selector))
}
export let dq1: {
  <K extends keyof HTMLElementTagNameMap>(
    selectors: K,
    tar?: Document | ValueOf<HTMLElementTagNameMap> | Element
  ): HTMLElementTagNameMap[K] | null
  <K extends keyof SVGElementTagNameMap>(
    selectors: K,
    tar?: Document | ValueOf<SVGElementTagNameMap> | Element
  ): SVGElementTagNameMap[K] | null
  <E extends Element = HTMLDivElement>(
    selectors: string,
    tar?: Document | Element
  ): E | null
} = (selector: string, tar = window.document as any) => {
  let dom = tar.querySelector(selector)
  return dom
}
