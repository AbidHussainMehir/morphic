import { tool } from 'ai'
import { createStreamableValue } from 'ai/rsc'
import Exa from 'exa-js'
import { searchSchema } from '@/lib/schema/search'
import { SearchSection } from '@/components/search-section'
import { ToolProps } from '.'
import Result from 'postcss/lib/result'

export const searchTool = ({ uiStream, fullResponse }: ToolProps) =>
  tool({
    description: 'Search the web for information',
    parameters: searchSchema,
    execute: async ({
      query,
      max_results,
      search_depth,
      include_domains,
      exclude_domains
    }) => {
      let hasError = false
      // Append the search section
      const streamResults = createStreamableValue<string>()
      uiStream.update(
        <SearchSection
          result={streamResults.value}
          includeDomains={include_domains}
        />
      )

      // Tavily API requires a minimum of 5 characters in the query
      const filledQuery =
        query.length < 5 ? query + ' '.repeat(5 - query.length) : query
      let searchResult
      const searchAPI: 'tavily' | 'exa' = 'tavily'
      try {
        searchResult =
          searchAPI === 'tavily'
            ? await tavilySearch(
                filledQuery,
                max_results,
                search_depth,
                include_domains,
                exclude_domains
              )
            : await exaSearch(query)
      } catch (error) {
        console.error('Search API error:', error)
        hasError = true
      }

      if (hasError) {
        fullResponse = `An error occurred while searching for "${query}.`
        uiStream.update(null)
        streamResults.done()
        return searchResult
      }

      streamResults.done(JSON.stringify(searchResult))

      return searchResult
    }
  })

async function tavilySearch(
  query: string,
  maxResults: number = 10,
  searchDepth: 'basic' | 'advanced' = 'basic',
  includeDomains: string[] = [],
  excludeDomains: string[] = []
): Promise<any> {
  // const apiKey = process.env.TAVILY_API_KEY
  // const response = await fetch('https://api.tavily.com/search', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     api_key: apiKey,
  //     query,
  //     max_results: maxResults < 5 ? 5 : maxResults,
  //     search_depth: searchDepth,
  //     include_images: true,
  //     include_answers: true,
  //     include_domains: includeDomains,
  //     exclude_domains: excludeDomains
  //   })
  // })

  // {
  //   query: 'what is AI?',
  //   follow_up_questions: null,
  //   answer: null,
  //   images: [
  //     'https://sciencenotes.org/wp-content/uploads/2022/07/What-Is-AI-or-Artificial-Intelligence-1024x683.png',
  //     'https://intellipaat.com/blog/wp-content/uploads/2018/01/AI-work1-01.jpg',
  //     'https://1reddrop.com/wp-content/uploads/2019/01/what-is-ai.jpg',
  //     'https://m.foolcdn.com/media/dubs/images/what-is-artificial-intelligence-infographic.width-880.png',
  //     'https://cdn.hostadvice.com/2023/03/final-what-is-ai-0.png'
  //   ],
  //   results: [
  //     {
  //       title: 'What is Artificial Intelligence (AI)? | IBM',
  //       url: 'https://www.ibm.com/topics/artificial-intelligence',
  //       content: 'But since the advent of electronic computing (and relative to some of the topics discussed in this article) important events and milestones in the evolution of artificial intelligence include the following:\n' +
  //         'Put AI to work in your business with IBM’s industry-leading AI expertise and portfolio of solutions at your side.\n' +
  //         ' In it, they delve into four potential goals or definitions of AI, which differentiates computer systems on the basis of rationality and thinking vs. acting:\n' +
  //         'Human approach:\n' +
  //         'Ideal approach:\n' +
  //         'Alan Turing’s definition would have fallen under the category of “systems that act like humans.”\n' +
  //         ' IBM acquires Manta to complement data and AI governance capabilities\n' +
  //         'IBM watsonx Orchestrate\n' +
  //         'IBM watsonx Assistant\n' +
  //         'Explore Gen AI learning for developers\n' +
  //         'Weak AI—also called Narrow AI or Artificial Narrow Intelligence (ANI)—is AI trained and focused to perform specific tasks. While a number of definitions of artificial intelligence (AI) have surfaced over the last few decades, John McCarthy offers the following definition in this 2004 paper (link resides outside ibm.com), " It is the science and engineering of making intelligent machines, especially intelligent computer programs. Artificial general intelligence (AGI), or general AI, is a theoretical form of AI where a machine would have an intelligence equaled to humans; it would have a self-aware consciousness that has the ability to solve problems, learn, and plan for the future.',
  //       score: 0.928668,
  //       raw_content: null
  //     },]
  let res = await fetch('https://ai.joblab.ai/text-only-search/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: query
    })
  })
  const data1 = await res.json()

  let ress = []
  console.log()
  for (let index = 0; index < data1?.searchResult?.results.length; index++) {
    const element = data1?.searchResult?.results[index]
    let obj11 = {
      title: element?.title,
      url: element?.url,
      content: element?.content,
      score: element?.score,
      raw_content: null
    }
    ress.push(obj11)
  }

  let obj = {
    ...data1?.searchResult,
    answers: data1?.searchResult?.answer,
    images: [],
    follow_up_questions: null,
    results: ress
  }
  // if (!response.ok) {
  //   throw new Error(`Error: ${response.status}`)
  // }

  // const data = await response.json()
  // console.log('res:', data.result)
  // console.log('res:', data.results)
  // console.log('res:', data)
  console.log('obj:', obj)
  return obj
  // return data
}

async function exaSearch(
  query: string,
  maxResults: number = 10,
  includeDomains: string[] = [],
  excludeDomains: string[] = []
): Promise<any> {
  const apiKey = process.env.EXA_API_KEY
  const exa = new Exa(apiKey)
  return exa.searchAndContents(query, {
    highlights: true,
    numResults: maxResults,
    includeDomains,
    excludeDomains
  })
}
