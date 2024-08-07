'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { Section } from './section'
import { StreamableValue, useStreamableValue } from 'ai/rsc'
import { BotMessage } from './message'
import { useEffect, useState } from 'react'

export type AnswerSectionProps = {
  // result?: StreamableValue<string>
  hasHeader?: boolean
}

export function AnswerSectionCopy({
  result,
  hasHeader = true
}: any) {
  // const [data, error, pending] = useStreamableValue(result)
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    if (!result) return
    setContent(result)
  }, [result])

  return (
    <div>
      {result?.length > 0 ? (
        <Section title={hasHeader ? 'Answer' : undefined}>
          <BotMessage content={result} />
        </Section>
      ) : (
        <div className="flex flex-col gap-2 py-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="w-full h-6" />
        </div>
      )}
    </div>
  )
}
