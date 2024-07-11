import React from 'react'
import Link from 'next/link'
import { SiDiscord, SiGithub, SiTwitter } from 'react-icons/si'
import { Button } from './ui/button'

const Footer: React.FC = () => {
  return (
    <footer className="w-[100%] p-1 md:p-2 fixed bottom-0 right-0">
      <div className="flex mb-4 gap-4 w-[100%] justify-center">
        <Button variant={'ghost'} size={'md'}>
          <Link
            href="https://git.new/theathena"
            className="mx-2"
            target="_blank"
          >
            Docs
          </Link>
        </Button>
        <Button variant={'ghost'} size={'md'}>
          <Link
            href="https://git.new/theathena"
            className="mx-2"
            target="_blank"
          >
            Deck
          </Link>
        </Button>
        <Button variant={'ghost'} size={'icon'}>
          <Link href="https://discord.gg/zRxaseCuGq" target="_blank">
            <SiDiscord color="dark" size={18} />
          </Link>
        </Button>
        <Button variant={'ghost'} size={'icon'}>
          <Link href="https://twitter.com/theathena" target="_blank">
            <SiTwitter size={18} />
          </Link>
        </Button>
        <Button variant={'ghost'} size={'icon'}>
          <Link href="https://git.new/theathena" target="_blank">
            <SiGithub size={18} />
          </Link>
        </Button>
      </div>
    </footer>
  )
}

export default Footer
