import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'

import { store } from './redux/store'
import { appRoutes } from './utils/routes-points'

const queryClient = new QueryClient()

export default function AppRouter() {
  const router = createBrowserRouter(
    appRoutes.map(({ route, Component }) => {
      return { path: route, Component: Component }
    })
  )

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  )
}
