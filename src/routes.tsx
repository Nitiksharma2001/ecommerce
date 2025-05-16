import { createBrowserRouter } from 'react-router-dom'
import { appRoutes } from './utils/routes-points'
import { RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './redux/store'

export default function AppRouter() {
  const router = createBrowserRouter(
    appRoutes.map(({ route, Component }) => {
      return { path: route, Component: Component }
    })
  )

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}
