// Dependencies
import React from 'react'
import { Provider } from 'react-redux'

// Router & Store
import { AppRouter } from './routers/AppRouter'
import { store } from './store/store'

export const App = () => {
  return (
    <div>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  )
}
