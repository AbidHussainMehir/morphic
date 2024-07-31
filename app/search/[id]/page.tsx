import { notFound, redirect } from 'next/navigation'
import { Chat } from '@/components/chat'
import { getChat } from '@/lib/actions/chat'
import { AI } from '@/app/actions'
import { useActiveAccount } from 'thirdweb/react'

export const maxDuration = 60

export interface SearchPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: SearchPageProps) {
  const chat = await getChat(params.id, 'anonymous')
  return {
    title: chat?.title.toString().slice(0, 50) || 'Search'
  }
}

export default async function SearchPage({ params }: SearchPageProps) {
  const userId = 'anonymous'
  const chat = await getChat(params.id, userId)

  if (!chat) {
    redirect('/')
  }

  if (chat?.userId !== userId) {
    notFound()
  }
  const account: any = { address: '0xb5483f5866A17635D8256d589f0905a54f8eA414' }

  return (
    <AI
      initialAIState={{
        chatId: chat.id,
        messages: chat.messages,
        user: account?.address
      }}
    >
      <Chat id={params.id} />
    </AI>
  )
}
