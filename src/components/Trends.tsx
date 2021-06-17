import { useStyletron } from 'baseui'
import { KIND, Tag, VARIANT } from 'baseui/tag'
import React, { useEffect, useState } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
} from 'recharts'

const data = [
  {
    name: 'Mon',
    topic1: 4000,
    topic2: 2400,
  },
  {
    name: 'Tue',
    topic1: 3000,
    topic2: 1398,
  },
  {
    name: 'Wed',
    topic1: 2000,
    topic2: 9800,
  },
  {
    name: 'Thu',
    topic1: 2780,
    topic2: 3908,
  },
  {
    name: 'Fri',
    topic1: 1890,
    topic2: 4800,
  },
  {
    name: 'Sat',
    topic1: 2390,
    topic2: 3800,
  },
  {
    name: 'Sun',
    topic1: 3490,
    topic2: 4300,
  },
]

enum TimeRange {
  WEEK,
  MONTH,
  YEAR,
}

const Trends = React.memo(
  React.forwardRef<HTMLParagraphElement, {}>((props, ref) => {
    const [css, theme] = useStyletron()
    const [timeRange, setTimeRange] = useState(TimeRange.WEEK)

    useEffect(() => {
      // TODO: Load data
    }, [timeRange])

    return (
      <div>
        <p
          ref={ref}
          className={css({
            ...theme.typography.HeadingMedium,
          })}
        >
          Trends:
        </p>
        <Tag
          kind={KIND.black}
          variant={
            timeRange === TimeRange.WEEK ? VARIANT.solid : VARIANT.outlined
          }
          onClick={() => {
            setTimeRange(TimeRange.WEEK)
          }}
          closeable={false}
        >
          1W
        </Tag>
        <Tag
          kind={KIND.black}
          variant={
            timeRange === TimeRange.MONTH ? VARIANT.solid : VARIANT.outlined
          }
          onClick={() => {
            setTimeRange(TimeRange.MONTH)
          }}
          closeable={false}
        >
          1M
        </Tag>
        <Tag
          kind={KIND.black}
          variant={
            timeRange === TimeRange.YEAR ? VARIANT.solid : VARIANT.outlined
          }
          onClick={() => {
            setTimeRange(TimeRange.YEAR)
          }}
          closeable={false}
        >
          1Y
        </Tag>
        <div
          className={css({
            width: '100%',
            height: '300px',
          })}
        >
          <ResponsiveContainer width={'100%'} height={'100%'}>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray={'3 3'} />
              <XAxis dataKey={'name'} {...theme.typography.LabelXSmall} />
              <Legend
                wrapperStyle={{
                  ...theme.typography.LabelXSmall,
                }}
              />
              <Line
                type={'monotone'}
                dataKey={'topic1'}
                stroke={'red'}
                name={'Topic 1'}
              />
              <Line
                type={'monotone'}
                dataKey={'topic2'}
                stroke={'blue'}
                name={'Topic 2'}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  })
)

export { Trends }
