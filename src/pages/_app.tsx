// ** Next Imports
import Head from 'next/head'
// import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login"
import Profile from "./pages/profile";
import store, {persistor} from 'src/store';
import ProtectedRoute from 'src/routes/ProtectedRoute'
// require('dotenv').config()

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
// if (themeConfig.routingLoader) {
//   Router.events.on('routeChangeStart', () => {
//     NProgress.start()
//   })
//   Router.events.on('routeChangeError', () => {
//     NProgress.done()
//   })
//   Router.events.on('routeChangeComplete', () => {
//     NProgress.done()
//   })
// }

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    // <CacheProvider value={emotionCache}>
    //   <Head>
    //     <title>{`RWS`}</title>
    //     <meta
    //       name='description'
    //       content={`Railway Warning System`}
    //     />
    //     <meta name='keywords' content='Railway Warning System' />
    //     <meta name='viewport' content='initial-scale=1, width=device-width' />
    //   </Head>

    //   <SettingsProvider>
    //     <SettingsConsumer>
    //       {({ settings }) => {
    //         return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
    //       }}
    //     </SettingsConsumer>
    //   </SettingsProvider>
    // </CacheProvider>

    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Router>
            <Routes>
              <Route path="/login" element={<LoginPage/>} />
              <Route path='/' element={<ProtectedRoute/>} />
                {/* <Route path='/' element={<Profile/>}/> */}
            </Routes>
        </Router>
      </PersistGate>
    </Provider>
/* <Provider store={store}>
<Head>
        <title>{`RWS`}</title>
        <meta
          name='description'
          content={`Railway Warning System`}
        />
        <meta name='keywords' content='Railway Warning System' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <SettingsConsumer>
                {({ settings }) => {
                  return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
                }}
              </SettingsConsumer>
      <PersistGate persistor={persistor} loading={null}>
        <Router>
            <Routes>
              <Route path="/login" element={LoginPage} />
              <Route path='/' element={<ProtectedRoute/>} />
            </Routes>
        </Router>
      </PersistGate>
      </Provider> */

      
        )
}

export default App
