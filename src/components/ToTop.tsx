'use client'
import { useOnce } from '@/hooks'
import { dq1 } from '@/utils'
import isClient from '@/utils/isClient'
import classNames from 'classnames'
import { debounce } from 'lodash-es'
import { FC, useState } from 'react'

type Props = {
  scrollParent?: HTMLElement | string
}
const ToTop: FC<Props> = props => {
  const [isVisible, setVisible] = useState(false)
  const [isEnd, setEnd] = useState(false)

  const getParent = () => {
    if (!isClient) return null
    if (!props.scrollParent) return document.body
    if (typeof props.scrollParent === 'string') return dq1(props.scrollParent)
    return props.scrollParent
  }

  useOnce(() => {
    const tar = getParent()
    if (!tar) return
    const offset = 10
    const handleScroll = debounce(() => {
      setVisible(tar.scrollTop > 30)
      setEnd(tar.scrollTop + tar.clientHeight + offset >= tar.scrollHeight)
    }, 300)

    tar.addEventListener('scroll', handleScroll)
    return () => {
      tar.removeEventListener('scroll', handleScroll)
    }
  })
  return (
    <div
      className={classNames(
        'to-top fixed dp:right-[40px] right-[24px] bottom-[100px] z-[5] dp:w-[48px] dp:h-[48px] w-[32px] h-[32px] rounded-full bg-[#b3b3b3] cursor-pointer hover:bg-[#a3a3a3] transition-all',
        !isVisible && 'hidden',
        isEnd ? 'dp:bottom-[116px]' : 'dp:bottom-[40px]'
      )}
      onClick={() => {
        setVisible(false)
        const tar = getParent()
        if (!tar) return
        tar.scroll({ top: 0, behavior: 'smooth' })
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        fill="none"
        className="dp:w-[48px] w-[32px]"
      >
        <path
          d="M16 28L24 20L32 28"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default ToTop
