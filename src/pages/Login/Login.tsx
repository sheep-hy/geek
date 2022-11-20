import React from 'react'
import { Button, Tabs } from 'antd-mobile'

function Login () {

    return (
      <div>login 登录
        <Button color='primary'>Primary</Button>
        <Tabs>
          <Tabs.Tab title='水果' key='fruits'>
            菠萝
          </Tabs.Tab>
          <Tabs.Tab title='蔬菜' key='vegetables'>
            西红柿
          </Tabs.Tab>
          <Tabs.Tab title='动物' key='animals'>
            蚂蚁
          </Tabs.Tab>
        </Tabs>
      </div>
    )

}

export default Login