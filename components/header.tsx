'use client'
import React from 'react'
import { ModeToggle } from './mode-toggle'
import { IconLogo } from './ui/icons'
import { cn } from '@/lib/utils'
import HistoryContainer from './history-container'
import { ConnectButton, useActiveAccount } from 'thirdweb/react'
import { client } from '../lib/utils/thirdweb-client'
import { ThirdwebProvider, lightTheme } from 'thirdweb/react'
import { createWallet, walletConnect, inAppWallet } from 'thirdweb/wallets'
import Link from 'next/link'
import { MenuIcon } from './ui/menu-icons'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'
export const Header: React.FC = () => {
  const router = useRouter()

  const account = useActiveAccount()
  let isConnected = !!account

  const wallets = [
    createWallet('io.metamask'),
    createWallet('com.coinbase.wallet'),
    walletConnect(),
    inAppWallet({
      auth: {
        options: ['email', 'google', 'apple', 'facebook']
      }
    }),
    createWallet('com.trustwallet.app'),
    createWallet('app.phantom')
  ]
  const handleRedirect = () => {
    redirect('/')

  }
  return (
    <header className="fixed w-full p-1 md:p-2 flex justify-between items-center z-10 backdrop-blur md:backdrop-blur-none bg-white md:bg-transparent">
      <div>
        <span className="ml-5 gap-3 flex justify-center align-center">
          {/* <Button className="mr-2" variant="ghost" size="icon"> */}
          <div style={{ cursor: 'pointer' }} onClick={handleRedirect}>
            <MenuIcon />
          </div>
          {/* </Button> */}
        </span>
        <span className="sr-only">Athena</span>
      </div>
      <div className="flex ">
        {/* <span className="mr-2">
          <ModeToggle />
        </span> */}
        <HistoryContainer location="header" />
        <div className={`${isConnected ? 'connected' : 'connect'}`}>
          <ConnectButton
            client={client}
            wallets={wallets}
            theme={lightTheme({
              colors: {
                accentText: '#02337e',
                accentButtonBg: '#02337e',
                borderColor: '#363536',
                primaryButtonBg: '#090e95',
                primaryButtonText: '#f9f5f9',
                secondaryIconColor: '#544f72'
              }
            })}
            connectModal={{
              size: 'wide',
              title: ' Athena AI',
              welcomeScreen: {
                title: 'The Future of Search with AI and Web3',
                subtitle: 'Create or Connect to Your Wallet to Get Started '
              },
              showThirdwebBranding: false
            }}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
