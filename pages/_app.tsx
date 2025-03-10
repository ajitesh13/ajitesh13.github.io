import Layout from '../components/layouts/main'
import Fonts from '../components/fonts'
import { AnimatePresence } from 'framer-motion'
import Chakra from '../components/chakra'
import Payhip from '../components/payhip'
import { Analytics } from '@vercel/analytics/react'
import { GoogleAnalytics } from '@next/third-parties/google'

import '../styles/app.scss'

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}

function Website({
  Component,
  pageProps,
  router
}: {
  Component: React.ComponentType
  pageProps: any
  router: any
}) {
  return (
    <>
      <Chakra cookies={pageProps.cookies}>
        <Fonts />
        <Payhip />
        <Layout router={router}>
          <AnimatePresence
            mode="wait"
            initial={true}
            onExitComplete={() => {
              if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0 })
              }
            }}
          >
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
          <Analytics />
        </Layout>
      </Chakra>
      <GoogleAnalytics gaId="G-8SYFHFEER9" />
    </>
  )
}

export default Website
