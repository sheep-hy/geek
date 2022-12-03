import React from 'react'
import './App.scss'
import {
  Link,
  Route,
  Switch,
  Router,
  Redirect,
} from 'react-router-dom'
import Login from './pages/Login/Login'
import Layout from '@/pages/Layout/Layout'
import ProfileEdit from '@/pages/Profile/Edit'
import { hasToken } from './utils/storage'
import PrivateRoute from '@/components/PrivateRoute'
import history from '@/utils/history'
import Chat from './pages/Profile/chat/Chat'
import Article from './pages/Article'

function App() {
  return (
    <div className="app">
      {/* 根组件111 */}
      <Router history={history}>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/home" />}></Route>

          <Route path="/login" component={Login}></Route>
          <Route path="/home">
            <Layout />
          </Route>
          {/* 需要登录才能访问的路由*/}
          <PrivateRoute path="/profile/edit" component={ProfileEdit}>
            {/* <ProfileEdit /> */}
          </PrivateRoute>
          <PrivateRoute path="/chat" component={Chat}>
            {/* <ProfileEdit /> */}
          </PrivateRoute>
          <PrivateRoute path="/article/:id" component={Article}>
          </PrivateRoute>
          {/* <Route path="/profile/edit">
            <ProfileEdit />
          </Route> */}
          {/* <Route
            path="/profile/edit"
            render={() => {
              if (hasToken()) {
                return <ProfileEdit />
              } else {
                return <Redirect to="/login"></Redirect>
              }
            }}
          ></Route> */}
        </Switch>
      </Router>
    </div>
  )
}

export default App
