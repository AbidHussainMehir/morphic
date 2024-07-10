'use client'
import React from 'react'
import { ModeToggle } from './mode-toggle'
import { IconLogo } from './ui/icons'
import { cn } from '@/lib/utils'
import HistoryContainer from './history-container'
import { ConnectButton, useActiveAccount } from 'thirdweb/react'
import { client } from '../lib/utils/thirdweb-client'
import {
  ThirdwebProvider,
  // ConnectButton,
} from "thirdweb/react";
import {
  createWallet,
  walletConnect,
  inAppWallet,
} from "thirdweb/wallets";
export const Header: React.FC = () => {
  const account = useActiveAccount()
  let isConnected = !!account

  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    walletConnect(),
    inAppWallet({
      auth: {
        options: [
          "email",
          "google",
          "apple",
          "facebook",
          "phone",
        ],
      },
    }),
  ];
  return (
    <header className="fixed w-full p-1 md:p-2 flex justify-between items-center z-10 backdrop-blur md:backdrop-blur-none bg-background/80 md:bg-transparent">
      <div>
        <a href="/">
          <IconLogo className={cn('w-5 h-5')} />

          <span className="sr-only">Athena</span>
        </a>
      </div>
      <div className="flex ">
        <span className='mr-2'>

        <ModeToggle />
        </span>
        <HistoryContainer location="header" />
        <div className={`${isConnected ? 'connected' : 'connect'}`}>
        <ThirdwebProvider>
      <ConnectButton
        client={client}
        wallets={wallets}
        theme={"dark"}
        connectModal={{
          size: "compact",
          title: "Connect to Athena AI",
          titleIcon: "",
          showThirdwebBranding: false,
        }}
      />
    </ThirdwebProvider>
          {/* <ConnectButton
            theme={'light'}
            client={client}
            appMetadata={{
              name: 'Athena',
              url: 'https://theathena.ai'
            }}
          /> */}
        </div>
      </div>
    </header>
  )
}

export default Header
