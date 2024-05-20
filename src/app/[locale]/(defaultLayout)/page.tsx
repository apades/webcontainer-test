import useI18n from '@/hooks/useI18n'
import Link from '@/standard/Link'
import IconStar from '@assets/star.svg'

export default function Home() {
  const { t } = useI18n()
  return (
    <div className="bg-gray-200 f-center">
      <div>{t('welcome')}</div>
      <IconStar className="w-[18px]" />
      <Link href="/child">to child</Link>
      <Link href="/layout-child">to layout-child</Link>
    </div>
  )
}
