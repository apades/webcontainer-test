import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { Language, locales } from './utils/lang'
import { headers } from 'next/headers'
import { get } from 'lodash-es'

const getI18nConfig = getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (await import(`./locales/${locale}.json`)).default,
  }
})

export default getI18nConfig

/**hooks/useI18n只能用在export default的server组件里，这个是给generateMetadata这些使用的 */
export async function getI18nInServer(props: { locale: Language }) {
  const locale = props.locale
  const { messages } = await getI18nConfig({ locale })
  return { t: (key: string) => get(messages, key), locale }
}
