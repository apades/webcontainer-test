import { locales } from '@/utils/lang'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { ComponentProps, FC } from 'react'

const {
  Link: NLink,
  redirect,
  usePathname,
  useRouter,
} = createSharedPathnamesNavigation({ locales, localePrefix: 'as-needed' })

type Props = ComponentProps<typeof NLink>
const Link: FC<Props> = props => {
  return <NLink {...props} />
}

export { redirect, usePathname, useRouter, Link }
