'use client'

import { SearchResults } from './search-results'
import { SearchSkeleton } from './search-skeleton'
import { SearchResultsImageSection } from './search-results-image'
import { Section } from './section'
import { ToolBadge } from './tool-badge'
import type { SearchResults as TypeSearchResults } from '@/lib/types'
import { StreamableValue, useStreamableValue } from 'ai/rsc'

export type SearchSectionProps = {
  // result?: StreamableValue<string>
  includeDomains?: string[]
}

export function SearchSectionCopy({ result, includeDomains }: any) {
  // const [data, error, pending] = useStreamableValue(result)
  const searchResults: TypeSearchResults = result ? JSON.parse(JSON.stringify(result)) : undefined
  const includeDomainsString = includeDomains
    ? ` [${includeDomains.join(', ')}]`
    : ''
  return (
    <div>
      { result ? (
        <>
          <Section size="sm" className="pt-2 pb-0">
            <ToolBadge tool="search">{`${searchResults.query}${includeDomainsString}`}</ToolBadge>
          </Section>
          {searchResults.images && searchResults.images.length > 0 && (
            <Section title="Images">
              <SearchResultsImageSection
                images={searchResults.images}
                query={searchResults.query}
              />
            </Section>
          )}
          <Section title="Sources">
            <SearchResults results={searchResults.results} />
          </Section>
        </>
      ) : (
        <Section className="pt-2 pb-0">
          <SearchSkeleton />
        </Section>
      )}
    </div>
  )
}
