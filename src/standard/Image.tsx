import { isString } from 'lodash-es'
import { ImageProps } from 'next/image'
import { FC } from 'react'

type Props = Omit<ImageProps, 'width'> & {
  alt?: string
  /**传入require图片对象 */
  src: any
  src2x?: any
  width?: number | string
}
const Image: FC<Props> = props => {
  let { src, src2x, ..._props } = props
  if (src2x && !props.width) console.error('传入src2x最好传个width')
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {..._props}
      alt={props.alt || ''}
      src={isString(src) ? src : src.default.src}
      {...(src2x
        ? { srcSet: `${src.default.src}, ${src2x.default.src} 2x` }
        : {})}
      width={props.width}
    />
  )
}

export default Image
