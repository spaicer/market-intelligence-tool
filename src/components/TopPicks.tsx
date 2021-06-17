import { useStyletron, withStyle } from 'baseui'
import { Button, SIZE } from 'baseui/button'
import { StyledSpinnerNext } from 'baseui/spinner'
import { LoremIpsum } from 'lorem-ipsum'
import React, { useCallback, useState } from 'react'

import { Pick, Trend } from './Pick'

const Spinner = withStyle(StyledSpinnerNext, {
  width: '14px',
  height: '14px',
  borderLeftWidth: '2px',
  borderRightWidth: '2px',
  borderTopWidth: '2px',
  borderBottomWidth: '2px',
  marginLeft: '16px',
})

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
})

type PickType = {
  headline: string
  body: string
  stars: number
  trend: Trend
}

const getRandomStar = (): number => {
  return Math.floor(Math.random() * 5) + 1
}

const getRandomTrend = (): Trend => {
  const trend = Math.floor(Math.random() * 3)
  return trend as Trend
}

const generateRandomPicks = (): PickType[] => {
  const picks: PickType[] = []
  for (let i = 0; i < 5; i++) {
    picks.push({
      headline: lorem.generateSentences(1).replace('.', ''),
      body: lorem.generateParagraphs(1),
      stars: getRandomStar(),
      trend: getRandomTrend(),
    })
  }
  return picks
}

const TopPicks = React.memo(
  React.forwardRef<HTMLParagraphElement, {}>((props, ref) => {
    const [css, theme] = useStyletron()
    const loadMore = useCallback(() => {
      setLoading(true)
      setTimeout(() => {
        setPicks((prev) => {
          return [...prev, ...generateRandomPicks()]
        })
        setLoading(false)
      }, 5000)
    }, [])
    const [loading, setLoading] = useState(false)
    const [picks, setPicks] = useState(generateRandomPicks())
    return (
      <div className={css({ paddingTop: '72px' })}>
        <p
          ref={ref}
          className={css({
            ...theme.typography.HeadingMedium,
          })}
        >
          Top picks:
        </p>
        <div>
          {picks.map(({ headline, body, stars, trend }, index) => {
            return (
              <Pick
                key={index}
                headline={headline}
                body={body}
                stars={stars}
                trend={trend}
              />
            )
          })}
          <Button
            size={SIZE.default}
            onClick={() => {
              loadMore()
            }}
            disabled={loading}
          >
            Load more {loading && <Spinner $as='span' />}
          </Button>
        </div>
      </div>
    )
  })
)

export { TopPicks }
