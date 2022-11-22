import React from "react";
import { Button, Tabs } from "antd-mobile";
import "./index.scss";
import Icon from "@/component/Icon";

function Login() {
  return (
    <div>
      {/* <svg className="icon" aria-hidden="true">
        <use xlinkHref="#icon-dianzan"></use>
      </svg> */}
      <Icon className="box" type="icon-gouwu" onClick={() =>{ console.log("213213")}}></Icon>
      login 登录2313213
      <div className="box1"> 1px</div>
      {/* <div className='box1'> 1px</div> */}
      <Button color="primary">Primary1</Button>
      <Tabs>
        <Tabs.Tab title="水果" key="fruits">
          菠萝
        </Tabs.Tab>
        <Tabs.Tab title="蔬菜" key="vegetables">
          西红柿
        </Tabs.Tab>
        <Tabs.Tab title="动物" key="animals">
          蚂蚁
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}

export default Login;
