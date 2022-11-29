import { hasToken } from '@/utils/storage'
import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
interface Props extends RouteProps {
  /** 自定义渲染组件 */
  component: React.ComponentType<any>
}
export default function PrivateRoute(props: Props) {
  const { component: Com } = props
  console.log(Com, props, 'children')
  return (
    <Route
      path={props.path}
      render={() => {
        if (hasToken()) {
          return <Com></Com>
        } else {
          console.log('没有token', props)
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location!.pathname },
              }}
            ></Redirect>
          )
        }
      }}
    ></Route>
  )
}
