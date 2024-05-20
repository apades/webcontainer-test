import ContentContainer from '@/components/ContentContainer'
import { FC } from 'react'

const Footer: FC = props => {
  return (
    <footer className="bg-blue-800">
      <ContentContainer className="bg-blue-500 h-[48px]">
        this is footer
      </ContentContainer>
    </footer>
  )
}

export default Footer
