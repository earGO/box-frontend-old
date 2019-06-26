import React from 'react'
import { Helmet } from 'react-helmet'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'

import { name as appName } from '../package.json'

import { baseRoute as nsiModuleRoute } from './components/nsi/module'

import { baseRoute as projectPageRoute } from './components/project-page/module'

import Layout from './components/common/Layout'
import Loading from './components/common/Loading'
import NotFound from './components/common/NotFound'

const routes = [
  {
    key: 'Main',
    path: '/',
    exact: true,
    component: React.lazy(() => import('./components/main')),
  },
  {
    key: 'Nsi',
    path: nsiModuleRoute,
    component: React.lazy(() => import('./components/nsi')),
  },
  {
    key: 'project-page',
    path: projectPageRoute,
    component: React.lazy(() => import('./components/project-page')),
  },
]

function Routes({ history }) {
  return (
    <React.Fragment>
      <Helmet>
        <title>{appName}</title>
      </Helmet>
      <ConnectedRouter history={history}>
        <Layout>
          <React.Suspense fallback={<Loading overlay />}>
            <Switch>
              {routes.map(route => (
                <Route {...route} />
              ))}
              <Route component={NotFound} />
            </Switch>
          </React.Suspense>
        </Layout>
      </ConnectedRouter>
    </React.Fragment>
  )
}

export default Routes
