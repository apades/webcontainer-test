declare module '*.svg' {
  const SVGComponent: React.FC<React.SVGProps<SVGSVGElement>>
  export default SVGComponent
}

declare module '*.svg?url' {
  export const src: string
}
