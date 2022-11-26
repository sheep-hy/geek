import React from 'react'
import './App.scss'
import {
  Link,
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom'
import Login from './pages/Login/Login'
import Layout from '@/pages/Layout/Layout'
import ProfileEdit from '@/pages/Profile/Edit'

function App() {
  return (
    <div className="app">
      {/* 根组件111 */}
      <Router>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/home" />}></Route>

          <Route path="/login" component={Login}></Route>
          <Route path="/home">
            <Layout />
          </Route>
          <Route path="/profile/edit">
            <ProfileEdit />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
