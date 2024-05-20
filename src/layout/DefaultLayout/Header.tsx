import ContentContainer from '@/components/ContentContainer'
import { FC } from 'react'

const Header: FC = props => {
  return (
    <header className="h-header-height border-b-[1px] border-black">
      <ContentContainer className="">this is header</ContentContainer>
    </header>
  )
}

export default Header
