import { Chat } from '@/components/chat'
import { generateId } from 'ai'
import { AI } from './actions'
import { useActiveAccount } from 'thirdweb/react'

export const maxDuration = 60

export default function Page() {
  const id = generateId()
  const account: any = { address: '0xb5483f5866A17635D8256d589f0905a54f8eA414' }
  return (
    <AI initialAIState={{ chatId: id, messages: [], user: account?.address }}>
      <Chat id={id} />
    </AI>
  )
}
