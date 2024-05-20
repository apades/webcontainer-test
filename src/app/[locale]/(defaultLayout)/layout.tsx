import DefaultLayout from '@/layout/DefaultLayout'
import { SLFC } from 'react'

const Layout: SLFC = props => {
  return <DefaultLayout>{props.children}</DefaultLayout>
}

export default Layout
