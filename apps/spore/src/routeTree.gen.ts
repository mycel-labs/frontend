/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AppImport } from './routes/_app'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const AppSettingLazyImport = createFileRoute('/_app/setting')()
const AppRewardLazyImport = createFileRoute('/_app/reward')()
const AppRefferralLazyImport = createFileRoute('/_app/refferral')()
const AppHomeLazyImport = createFileRoute('/_app/home')()
const AppBoardLazyImport = createFileRoute('/_app/board')()
const AppAboutLazyImport = createFileRoute('/_app/about')()

// Create/Update Routes

const AppRoute = AppImport.update({
  id: '/_app',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const AppSettingLazyRoute = AppSettingLazyImport.update({
  path: '/setting',
  getParentRoute: () => AppRoute,
} as any).lazy(() => import('./routes/_app.setting.lazy').then((d) => d.Route))

const AppRewardLazyRoute = AppRewardLazyImport.update({
  path: '/reward',
  getParentRoute: () => AppRoute,
} as any).lazy(() => import('./routes/_app.reward.lazy').then((d) => d.Route))

const AppRefferralLazyRoute = AppRefferralLazyImport.update({
  path: '/refferral',
  getParentRoute: () => AppRoute,
} as any).lazy(() =>
  import('./routes/_app.refferral.lazy').then((d) => d.Route),
)

const AppHomeLazyRoute = AppHomeLazyImport.update({
  path: '/home',
  getParentRoute: () => AppRoute,
} as any).lazy(() => import('./routes/_app.home.lazy').then((d) => d.Route))

const AppBoardLazyRoute = AppBoardLazyImport.update({
  path: '/board',
  getParentRoute: () => AppRoute,
} as any).lazy(() => import('./routes/_app.board.lazy').then((d) => d.Route))

const AppAboutLazyRoute = AppAboutLazyImport.update({
  path: '/about',
  getParentRoute: () => AppRoute,
} as any).lazy(() => import('./routes/_app.about.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/_app': {
      preLoaderRoute: typeof AppImport
      parentRoute: typeof rootRoute
    }
    '/_app/about': {
      preLoaderRoute: typeof AppAboutLazyImport
      parentRoute: typeof AppImport
    }
    '/_app/board': {
      preLoaderRoute: typeof AppBoardLazyImport
      parentRoute: typeof AppImport
    }
    '/_app/home': {
      preLoaderRoute: typeof AppHomeLazyImport
      parentRoute: typeof AppImport
    }
    '/_app/refferral': {
      preLoaderRoute: typeof AppRefferralLazyImport
      parentRoute: typeof AppImport
    }
    '/_app/reward': {
      preLoaderRoute: typeof AppRewardLazyImport
      parentRoute: typeof AppImport
    }
    '/_app/setting': {
      preLoaderRoute: typeof AppSettingLazyImport
      parentRoute: typeof AppImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  AppRoute.addChildren([
    AppAboutLazyRoute,
    AppBoardLazyRoute,
    AppHomeLazyRoute,
    AppRefferralLazyRoute,
    AppRewardLazyRoute,
    AppSettingLazyRoute,
  ]),
])

/* prettier-ignore-end */
