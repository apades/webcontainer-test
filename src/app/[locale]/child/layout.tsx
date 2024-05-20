import useI18n from '@/hooks/useI18n'
import { getI18nInServer } from '@/i18n'
import { Link } from '@/standard/navigation'
import { Language } from '@/utils/lang'
import { GenerateMetadata, Metadata } from 'next'
import { NextRequest } from 'next/server'
import { SLFC } from 'react'

export const generateMetadata: GenerateMetadata = async props => {
  const { t } = await getI18nInServer(props.params)
  return {
    title: t('welcome') + '   adsf',
  }
}

const Layout: SLFC = props => {
  const { t, locale } = useI18n()
  return (
    <div>
      <div>
        server layout render: {t('welcome')} {locale}
      </div>
      <div>{props.children}</div>
      <div>
        <Link href="/child" locale={Language['Chinese(Simplified)']}>
          to zh-CN
        </Link>
      </div>
      <div>
        <Link href="/child" locale={Language.English}>
          to en
        </Link>
      </div>
    </div>
  )
}

export default Layout
