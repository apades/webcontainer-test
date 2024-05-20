'use client'
import ToTop from '@/components/ToTop'
import { Layout } from 'antd'
import { FC, PropsWithChildren, memo } from 'react'
import LayoutFooter from './Footer'
import LayoutHeader from './Header'
import './index.scss'

const layoutClass = 'default-layout'

type Props = PropsWithChildren
const DefaultLayout: FC<Props> = props => {
  return (
    <Layout className={layoutClass}>
      <LayoutHeader />
      <Layout.Content>
        {props.children}
        <ToTop scrollParent={`.${layoutClass} .ant-layout-content`} />
        <LayoutFooter />
      </Layout.Content>
    </Layout>
  )
}

export default memo(DefaultLayout)
