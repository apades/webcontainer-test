import { Button as AntdButton, ButtonProps } from 'antd'
import { FC } from 'react'

type Props = ButtonProps
const Button: FC<Props> = props => {
  return <AntdButton {...props} />
}

export default Button
