import { mdiArrowBottomRight, mdiArrowRight, mdiArrowTopRight } from '@mdi/js'
import Icon from '@mdi/react'
import { useStyletron, withStyle } from 'baseui'
import { Card, StyledBody, StyledTitle } from 'baseui/card'
import { StarRating } from 'baseui/rating'
import React, { useState } from 'react'

export enum Trend {
  UP,
  DOWN,
  SIDEWAYS,
}

const StyledPickHeader = withStyle(StyledTitle, ({ $theme }) => ({
  flex: 'auto',
}))

const getTrendIcon = (trend: Trend) => {
  switch (trend) {
    case Trend.UP:
      return <Icon path={mdiArrowTopRight} size={'22px'} color={'green'} />
    case Trend.DOWN:
      return <Icon path={mdiArrowBottomRight} size={'22px'} color={'red'} />
    case Trend.SIDEWAYS:
      return <Icon path={mdiArrowRight} size={'22px'} color={'orange'} />
  }
}

const Pick: React.FC<{
  headline: string
  body: string
  stars: number
  trend: Trend
}> = ({ headline, body, stars, trend }) => {
  const [css, theme] = useStyletron()
  const [rating, setRating] = useState(stars)
  return (
    <Card
      title={headline}
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            width: '640px',
            marginBottom: $theme.sizing.scale600,
          }),
        },
        Title: {
          component: (props: any) => {
            return (
              <div
                className={css({
                  display: 'flex',
                  flexDirection: 'row',
                })}
              >
                <StyledPickHeader>{props.children}</StyledPickHeader>
                <div>{getTrendIcon(trend)}</div>
              </div>
            )
          },
        },
      }}
    >
      <StyledBody>
        <p>{body}</p>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'row',
          })}
        >
          <div
            className={css({
              flex: '0 1 50%',
            })}
          >
            <p
              className={css({
                ...theme.typography.HeadingXSmall,
              })}
            >
              Related articles
            </p>
            <ul>
              <li>Article 1</li>
              <li>Article 2</li>
              <li>Article 3</li>
            </ul>
          </div>
          <div
            className={css({
              flex: '0 1 50%',
            })}
          >
            <p
              className={css({
                ...theme.typography.HeadingXSmall,
              })}
            >
              Labels
            </p>
            <table>
              <thead>
                <tr>
                  <th>Topic 1</th>
                  <th>Topic 2</th>
                  <th>Topic n</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Value 1</td>
                  <td>Value 2</td>
                  <td>Value n</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <StarRating
          numItems={5}
          size={22}
          onChange={(data) => setRating(data.value)}
          value={rating}
          readOnly
        />
      </StyledBody>
    </Card>
  )
}

export { Pick }
