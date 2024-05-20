'use client'
import { useOnce } from '@/hooks'
import useI18n from '@/hooks/useI18n'
import { Button } from '@/standard/antd'
import { Link } from '@/standard/navigation'
import { SFC, useState } from 'react'

const Page: SFC = props => {
  const { t, locale } = useI18n()
  const [state, setState] = useState('')
  useOnce(() => {
    setState('change')
  })
  return (
    <div>
      <div>
        client page render: {t('welcome')} {locale}
      </div>
      <div>{state}</div>
      <Button type="primary">hahaha</Button>
    </div>
  )
}

export default Page
