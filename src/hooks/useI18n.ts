import { Language } from '@/utils/lang'
import { useLocale } from 'next-intl'
import { useTranslations } from 'standard/next-intl'

/**server、client 均可以直接使用 */
export default function useI18n() {
  const t = useTranslations()
  const locale = useLocale() as Language
  return { t, locale }
}
