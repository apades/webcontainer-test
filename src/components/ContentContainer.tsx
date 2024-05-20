/**
 * 用来包住内容的组件，带有主体内容宽度的限制，在小屏幕下有32px的左右保底padding
 *
 * 这个组件是跟var.css的--content-width变量联动的
 */
import classNames from 'classnames'
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'

type Props = {
  width?: number
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const ContentContainer: FC<Props> = props => {
  const { width, ..._props } = props
  return (
    <div
      {..._props}
      className={classNames(
        'px-[32px] max-w-[var(--content-width)+32px*2]',
        props.className
      )}
      style={{
        ...(props.style ?? {}),
        ...(width ? { '--content-width': `${width}px` } : {}),
      }}
    />
  )
}

export default ContentContainer
