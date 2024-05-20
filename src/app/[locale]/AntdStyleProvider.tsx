'use client'
import { FC, PropsWithChildren, useMemo } from 'react'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import Entity from '@ant-design/cssinjs/lib/Cache'
import Head from 'next/head'
import { useServerInsertedHTML } from 'next/navigation'

const AntdStyleProvider: FC<PropsWithChildren> = props => {
  const cache = useMemo<Entity>(() => createCache(), [createCache])

  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />
  ))
  return <StyleProvider cache={cache}>{props.children}</StyleProvider>
}

export default AntdStyleProvider
