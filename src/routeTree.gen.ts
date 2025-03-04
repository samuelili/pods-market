/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TestImport } from './routes/test'
import { Route as LoginImport } from './routes/login'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthenticatedShoppingPodsAllImport } from './routes/_authenticated/_shopping/pods/all'
import { Route as AuthenticatedShoppingPodsPodIdImport } from './routes/_authenticated/_shopping/pods/$podId'

// Create Virtual Routes

const AuthenticatedIndexLazyImport = createFileRoute('/_authenticated/')()
const JoinPodIdLazyImport = createFileRoute('/join/$podId')()
const AuthenticatedCreateLazyImport = createFileRoute(
  '/_authenticated/create',
)()
const AuthenticatedSettingsIndexLazyImport = createFileRoute(
  '/_authenticated/settings/',
)()
const AuthenticatedCreatePodLazyImport = createFileRoute(
  '/_authenticated/create/pod',
)()
const AuthenticatedCreateListingLazyImport = createFileRoute(
  '/_authenticated/create/listing',
)()

// Create/Update Routes

const TestRoute = TestImport.update({
  id: '/test',
  path: '/test',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login.lazy').then((d) => d.Route))

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/_authenticated.lazy').then((d) => d.Route),
)

const AuthenticatedIndexLazyRoute = AuthenticatedIndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthenticatedRoute,
} as any).lazy(() =>
  import('./routes/_authenticated/index.lazy').then((d) => d.Route),
)

const JoinPodIdLazyRoute = JoinPodIdLazyImport.update({
  id: '/join/$podId',
  path: '/join/$podId',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/join.$podId.lazy').then((d) => d.Route))

const AuthenticatedCreateLazyRoute = AuthenticatedCreateLazyImport.update({
  id: '/create',
  path: '/create',
  getParentRoute: () => AuthenticatedRoute,
} as any).lazy(() =>
  import('./routes/_authenticated/create.lazy').then((d) => d.Route),
)

const AuthenticatedSettingsIndexLazyRoute =
  AuthenticatedSettingsIndexLazyImport.update({
    id: '/settings/',
    path: '/settings/',
    getParentRoute: () => AuthenticatedRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/settings/index.lazy').then((d) => d.Route),
  )

const AuthenticatedCreatePodLazyRoute = AuthenticatedCreatePodLazyImport.update(
  {
    id: '/pod',
    path: '/pod',
    getParentRoute: () => AuthenticatedCreateLazyRoute,
  } as any,
).lazy(() =>
  import('./routes/_authenticated/create/pod.lazy').then((d) => d.Route),
)

const AuthenticatedCreateListingLazyRoute =
  AuthenticatedCreateListingLazyImport.update({
    id: '/listing',
    path: '/listing',
    getParentRoute: () => AuthenticatedCreateLazyRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/create/listing.lazy').then((d) => d.Route),
  )

const AuthenticatedShoppingPodsAllRoute =
  AuthenticatedShoppingPodsAllImport.update({
    id: '/_shopping/pods/all',
    path: '/pods/all',
    getParentRoute: () => AuthenticatedRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/_shopping/pods/all.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthenticatedShoppingPodsPodIdRoute =
  AuthenticatedShoppingPodsPodIdImport.update({
    id: '/_shopping/pods/$podId',
    path: '/pods/$podId',
    getParentRoute: () => AuthenticatedRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/_shopping/pods/$podId.lazy').then(
      (d) => d.Route,
    ),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/test': {
      id: '/test'
      path: '/test'
      fullPath: '/test'
      preLoaderRoute: typeof TestImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/create': {
      id: '/_authenticated/create'
      path: '/create'
      fullPath: '/create'
      preLoaderRoute: typeof AuthenticatedCreateLazyImport
      parentRoute: typeof AuthenticatedImport
    }
    '/join/$podId': {
      id: '/join/$podId'
      path: '/join/$podId'
      fullPath: '/join/$podId'
      preLoaderRoute: typeof JoinPodIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/': {
      id: '/_authenticated/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthenticatedIndexLazyImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/create/listing': {
      id: '/_authenticated/create/listing'
      path: '/listing'
      fullPath: '/create/listing'
      preLoaderRoute: typeof AuthenticatedCreateListingLazyImport
      parentRoute: typeof AuthenticatedCreateLazyImport
    }
    '/_authenticated/create/pod': {
      id: '/_authenticated/create/pod'
      path: '/pod'
      fullPath: '/create/pod'
      preLoaderRoute: typeof AuthenticatedCreatePodLazyImport
      parentRoute: typeof AuthenticatedCreateLazyImport
    }
    '/_authenticated/settings/': {
      id: '/_authenticated/settings/'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof AuthenticatedSettingsIndexLazyImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/_shopping/pods/$podId': {
      id: '/_authenticated/_shopping/pods/$podId'
      path: '/pods/$podId'
      fullPath: '/pods/$podId'
      preLoaderRoute: typeof AuthenticatedShoppingPodsPodIdImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/_shopping/pods/all': {
      id: '/_authenticated/_shopping/pods/all'
      path: '/pods/all'
      fullPath: '/pods/all'
      preLoaderRoute: typeof AuthenticatedShoppingPodsAllImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedCreateLazyRouteChildren {
  AuthenticatedCreateListingLazyRoute: typeof AuthenticatedCreateListingLazyRoute
  AuthenticatedCreatePodLazyRoute: typeof AuthenticatedCreatePodLazyRoute
}

const AuthenticatedCreateLazyRouteChildren: AuthenticatedCreateLazyRouteChildren =
  {
    AuthenticatedCreateListingLazyRoute: AuthenticatedCreateListingLazyRoute,
    AuthenticatedCreatePodLazyRoute: AuthenticatedCreatePodLazyRoute,
  }

const AuthenticatedCreateLazyRouteWithChildren =
  AuthenticatedCreateLazyRoute._addFileChildren(
    AuthenticatedCreateLazyRouteChildren,
  )

interface AuthenticatedRouteChildren {
  AuthenticatedCreateLazyRoute: typeof AuthenticatedCreateLazyRouteWithChildren
  AuthenticatedIndexLazyRoute: typeof AuthenticatedIndexLazyRoute
  AuthenticatedSettingsIndexLazyRoute: typeof AuthenticatedSettingsIndexLazyRoute
  AuthenticatedShoppingPodsPodIdRoute: typeof AuthenticatedShoppingPodsPodIdRoute
  AuthenticatedShoppingPodsAllRoute: typeof AuthenticatedShoppingPodsAllRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedCreateLazyRoute: AuthenticatedCreateLazyRouteWithChildren,
  AuthenticatedIndexLazyRoute: AuthenticatedIndexLazyRoute,
  AuthenticatedSettingsIndexLazyRoute: AuthenticatedSettingsIndexLazyRoute,
  AuthenticatedShoppingPodsPodIdRoute: AuthenticatedShoppingPodsPodIdRoute,
  AuthenticatedShoppingPodsAllRoute: AuthenticatedShoppingPodsAllRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof AuthenticatedRouteWithChildren
  '/login': typeof LoginRoute
  '/test': typeof TestRoute
  '/create': typeof AuthenticatedCreateLazyRouteWithChildren
  '/join/$podId': typeof JoinPodIdLazyRoute
  '/': typeof AuthenticatedIndexLazyRoute
  '/create/listing': typeof AuthenticatedCreateListingLazyRoute
  '/create/pod': typeof AuthenticatedCreatePodLazyRoute
  '/settings': typeof AuthenticatedSettingsIndexLazyRoute
  '/pods/$podId': typeof AuthenticatedShoppingPodsPodIdRoute
  '/pods/all': typeof AuthenticatedShoppingPodsAllRoute
}

export interface FileRoutesByTo {
  '/login': typeof LoginRoute
  '/test': typeof TestRoute
  '/create': typeof AuthenticatedCreateLazyRouteWithChildren
  '/join/$podId': typeof JoinPodIdLazyRoute
  '/': typeof AuthenticatedIndexLazyRoute
  '/create/listing': typeof AuthenticatedCreateListingLazyRoute
  '/create/pod': typeof AuthenticatedCreatePodLazyRoute
  '/settings': typeof AuthenticatedSettingsIndexLazyRoute
  '/pods/$podId': typeof AuthenticatedShoppingPodsPodIdRoute
  '/pods/all': typeof AuthenticatedShoppingPodsAllRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/login': typeof LoginRoute
  '/test': typeof TestRoute
  '/_authenticated/create': typeof AuthenticatedCreateLazyRouteWithChildren
  '/join/$podId': typeof JoinPodIdLazyRoute
  '/_authenticated/': typeof AuthenticatedIndexLazyRoute
  '/_authenticated/create/listing': typeof AuthenticatedCreateListingLazyRoute
  '/_authenticated/create/pod': typeof AuthenticatedCreatePodLazyRoute
  '/_authenticated/settings/': typeof AuthenticatedSettingsIndexLazyRoute
  '/_authenticated/_shopping/pods/$podId': typeof AuthenticatedShoppingPodsPodIdRoute
  '/_authenticated/_shopping/pods/all': typeof AuthenticatedShoppingPodsAllRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/login'
    | '/test'
    | '/create'
    | '/join/$podId'
    | '/'
    | '/create/listing'
    | '/create/pod'
    | '/settings'
    | '/pods/$podId'
    | '/pods/all'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/login'
    | '/test'
    | '/create'
    | '/join/$podId'
    | '/'
    | '/create/listing'
    | '/create/pod'
    | '/settings'
    | '/pods/$podId'
    | '/pods/all'
  id:
    | '__root__'
    | '/_authenticated'
    | '/login'
    | '/test'
    | '/_authenticated/create'
    | '/join/$podId'
    | '/_authenticated/'
    | '/_authenticated/create/listing'
    | '/_authenticated/create/pod'
    | '/_authenticated/settings/'
    | '/_authenticated/_shopping/pods/$podId'
    | '/_authenticated/_shopping/pods/all'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
  LoginRoute: typeof LoginRoute
  TestRoute: typeof TestRoute
  JoinPodIdLazyRoute: typeof JoinPodIdLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  LoginRoute: LoginRoute,
  TestRoute: TestRoute,
  JoinPodIdLazyRoute: JoinPodIdLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authenticated",
        "/login",
        "/test",
        "/join/$podId"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/create",
        "/_authenticated/",
        "/_authenticated/settings/",
        "/_authenticated/_shopping/pods/$podId",
        "/_authenticated/_shopping/pods/all"
      ]
    },
    "/login": {
      "filePath": "login.ts"
    },
    "/test": {
      "filePath": "test.tsx"
    },
    "/_authenticated/create": {
      "filePath": "_authenticated/create.lazy.tsx",
      "parent": "/_authenticated",
      "children": [
        "/_authenticated/create/listing",
        "/_authenticated/create/pod"
      ]
    },
    "/join/$podId": {
      "filePath": "join.$podId.lazy.tsx"
    },
    "/_authenticated/": {
      "filePath": "_authenticated/index.lazy.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/create/listing": {
      "filePath": "_authenticated/create/listing.lazy.tsx",
      "parent": "/_authenticated/create"
    },
    "/_authenticated/create/pod": {
      "filePath": "_authenticated/create/pod.lazy.tsx",
      "parent": "/_authenticated/create"
    },
    "/_authenticated/settings/": {
      "filePath": "_authenticated/settings/index.lazy.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/_shopping/pods/$podId": {
      "filePath": "_authenticated/_shopping/pods/$podId.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/_shopping/pods/all": {
      "filePath": "_authenticated/_shopping/pods/all.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
