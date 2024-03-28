import React, { Suspense } from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import NotFound from '~/components/NotFound'
import { Toaster } from '@/components/ui/sonner'
import { useStore } from '@/store'
import Loading from '~/components/Loading'

import '~/global.css'

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      )

function RootComponent() {
  const isLoading = useStore((state) => state.isLoading)

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow overflow-x-hidden">
          <Outlet />
        </main>
        <Toaster />
        <Suspense>
          <TanStackRouterDevtools />
        </Suspense>
        {isLoading && <Loading />}
      </div>
    </>
  )
}

export const Route = createRootRoute({
  component: () => <RootComponent />,
  notFoundComponent: () => <NotFound />,
  pendingComponent: () => <Loading />,
})
