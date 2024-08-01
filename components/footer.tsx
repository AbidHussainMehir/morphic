'use client'
import React from 'react'
import Link from 'next/link'
import { SiDiscord, SiGmail, SiTelegram, SiTwitter } from 'react-icons/si'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'

const Footer: React.FC = () => {
  const pathname = usePathname()
  const linksClick = (linkText: any) => {
    window._mtm.push({
      event: 'menu-clicks-tracking',
      'event-category': 'menu-clicks',
      'event-value': linkText,
      'event-action': `${document.title} - ${window.location.href}`
    })
  }
  const socialLinksClick = (linkText: any) => {
    window._mtm.push({
      event: 'social-media-icons-tracking',
      'event-category': 'social-media-icons',
      'event-value': linkText,
      'event-action': `${document.title} - ${window.location.href}`
    })
  }
  return (
    <footer className="w-[100%] p-1 md:p-2 fixed bottom-0 right-0">
      {!pathname.includes('search') && !pathname.includes('share') && (
        <div className="flex mb-4 gap-4 w-[100%] justify-center">
          <Button variant="ghost" size="md">
            <Link
              onClick={() => linksClick('https://dashboard.theathena.ai')}
              href={'https://dashboard.theathena.ai'}
            >
              Dashboard
            </Link>
          </Button>
          <Button variant={'ghost'} size={'md'}>
            <Link
              onClick={() => linksClick('https://docs.theathena.ai')}
              href="https://docs.theathena.ai"
              className="mx-2"
              target="_blank"
            >
              Docs
            </Link>
          </Button>
          <Button variant={'ghost'} size={'md'}>
            <Link
              onClick={() => linksClick('https://deck.theathena.ai')}
              href="https://deck.theathena.ai"
              className="mx-2"
              target="_blank"
            >
              Deck
            </Link>
          </Button>
          <Button variant={'ghost'} size={'icon'}>
            <Link
              onClick={() => socialLinksClick('discord')}
              href="https://discord.gg/zRxaseCuGq"
              target="_blank"
            >
              <SiDiscord color="dark" size={18} />
            </Link>
          </Button>
          <Button variant={'ghost'} size={'icon'}>
            <Link
              onClick={() => socialLinksClick('twitter')}
              href="https://twitter.com/theathena"
              target="_blank"
            >
              <SiTwitter size={18} />
            </Link>
          </Button>
          <Button variant={'ghost'} size={'icon'}>
            <Link
              onClick={() => socialLinksClick('telegram')}
              href="https://twitter.com/theathena"
              target="_blank"
            >
              <SiTelegram size={18} />
            </Link>
          </Button>

          <Button variant={'ghost'} size={'icon'}>
            <Link
              onClick={() => socialLinksClick('mail')}
              href="mailto:hello@theathena.ai"
              target="_blank"
            >
              <SiGmail size={18} />
            </Link>
          </Button>
        </div>
      )}
    </footer>
  )
}

export default Footer
