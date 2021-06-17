import { BaseProvider, LightTheme } from 'baseui'
import { AppNavBar, NavItemT, setItemActive } from 'baseui/app-nav-bar'
import { Layer } from 'baseui/layer'
import React, { useEffect, useRef } from 'react'
import { useInViewport } from 'react-in-viewport'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'

import { TopPicks } from './components/TopPicks'
import { Trends } from './components/Trends'

const engine = new Styletron()

function App() {
  const [mainItems, setMainItems] = React.useState<NavItemT[]>([
    { label: 'Home', info: { id: 1 }, active: true },
    { label: 'Trends', info: { id: 2 } },
    { label: 'Settings', info: { id: 3 } },
  ])

  const topPicksRef = useRef<HTMLParagraphElement>(null)
  const trendsRef = useRef<HTMLParagraphElement>(null)

  const { inViewport: topPicksInViewport } = useInViewport(
    topPicksRef,
    {},
    { disconnectOnLeave: false },
    {}
  )

  const { inViewport: trendsInViewport } = useInViewport(
    trendsRef,
    {},
    { disconnectOnLeave: false },
    {}
  )

  useEffect(() => {
    if (topPicksInViewport) {
      setMainItems((prev) => {
        return prev.map((item) => {
          if (item.label === 'Home') {
            return { ...item, active: true }
          } else {
            return { ...item, active: false }
          }
        })
      })
    } else if (trendsInViewport) {
      setMainItems((prev) => {
        return prev.map((item) => {
          if (item.label === 'Trends') {
            return { ...item, active: true }
          } else {
            return { ...item, active: false }
          }
        })
      })
    }
  }, [topPicksInViewport, trendsInViewport])

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Layer>
          <div
            style={{
              boxSizing: 'border-box',
              width: '100vw',
              position: 'fixed',
              top: '0',
              left: '0',
            }}
          >
            <AppNavBar
              title={'Market Intelligence Tool'}
              mainItems={mainItems}
              onMainItemSelect={(item) => {
                setMainItems((prev) => setItemActive(prev, item))
                switch (item.label) {
                  case 'Home':
                    if (topPicksRef && topPicksRef.current) {
                      topPicksRef.current.scrollIntoView({ behavior: 'smooth' })
                    }
                    break
                  case 'Trends':
                    if (trendsRef && trendsRef.current) {
                      trendsRef.current.scrollIntoView({ behavior: 'smooth' })
                    }
                    break
                }
              }}
            />
          </div>
        </Layer>
        <TopPicks ref={topPicksRef} />
        <Trends ref={trendsRef} />
      </BaseProvider>
    </StyletronProvider>
  )
}

export default App
