'use client'
import React from 'react'
import { History } from './history'
import { HistoryList } from './history-list'
import { useActiveAccount } from 'thirdweb/react'

type HistoryContainerProps = {
  location: 'sidebar' | 'header'
}

const HistoryContainer: React.FC<HistoryContainerProps> = ({ location }) => {
  const account = useActiveAccount()
  return (
    <div
      className={location === 'header' ? 'block sm:hidden' : 'hidden sm:block'}
    >
      <History location={location}>
        <HistoryList userId={account?.address ?? 'anonymous'} />
      </History>
    </div>
  )
}

export default HistoryContainer
