import React, { ComponentType } from 'react'
import { Provider } from 'react-redux'
import { AppInitialProps } from 'next/app'
import { store } from '../store/store'
import Navbar from '../components/Navbar'

const MyApp = ({
  Component,
  pageProps,
}: {
  Component: ComponentType<AppInitialProps>
  pageProps: AppInitialProps
}) => {
  return (
    <Provider store={store}>
      <Navbar />
        <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
