// import NavBar from '@/components/NavBar'
import styles from './index.module.scss'
import {
  Button,
  NavBar,
  Form,
  Input,
  Toast,
  Dialog,
  InputRef,
} from 'antd-mobile'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCode, login } from '@/store/actions/login'
import { LoginFrom } from '@/types/data.d'
import { useHistory, useLocation } from 'react-router'
import { AxiosError } from 'axios'

export default function Login() {
  const dispatch = useDispatch<any>()
  const history = useHistory()
  // 注意：state可能是不存在的，所以类型中要明确包含不存在的情况 即 underfined
  const location = useLocation<{ from: string }>()
  // 通过 useForm 来拿到 Form 的实例对象
  const [form] = Form.useForm()
  // 创建手机号文本框的ref对象
  const inputRef = useRef<InputRef>(null)
  const [time, setTime] = useState(0)
  const onFinish = async (values: LoginFrom) => {
    try {
      // 注意：此处需要调用 unwrap() 方法，才能正确捕获 login thunk action 中的错误
      //  dispatch(login(values)).unwrap();
      await dispatch(login(values))
      // await sleep(1000)
      Toast.show({
        content: '登录成功',
        duration: 600,
        afterClose: () => {
          if (location.state) {
            history.push(location.state.from)
          } else {
            history.push('./home')
          }
        },
      })
    } catch (err) {
      // 类型断言
      const e = err as AxiosError<{ message: string }>
      Toast.show({
        content: e.response?.data.message || '登录失败',
        duration: 1000,
      })
    }
  }
  const onGetCode = async () => {
    // 验证手机号的格式 获取它的值
    const mobile = form.getFieldValue('mobile')
    // 验证手机好的值 是否正确
    const hasError = form.getFieldError('mobile').length > 0
    if (hasError || !mobile) {
      // 手机号验证错误 获取手机号的值为空 自动获取焦点
      inputRef.current?.focus()
      return
    }
    try {
      await dispatch(getCode(mobile))
      Toast.show({
        content: '验证码已发送',
        duration: 600,
      })
      // 开启倒计时
      setTime(59)
      let timeId = setInterval(() => {
        // 当我们每次都想要获取到最新的状态，需要写成 箭头函数的形式
        setTime((time) => {
          if (time === 1) {
            clearInterval(timeId)
          }
          return time - 1
        })
      }, 1000)
    } catch (err) {
      // 类型断言
      const e = err as AxiosError<{ message: string }>
      Toast.show({
        content: e.response?.data.message || '验证失败',
        duration: 1000,
      })
      inputRef.current?.focus()
    }
  }
  return (
    <div className={styles.root}>
      {/* 导航条 */}
      {/* <NavBar>登录</NavBar> */}
      {/* 内容 */}
      <div className="login-form">
        <h2 className="title">账号登录</h2>
        <Form
          // 将实例对象 form 跟当前的表单绑定到一块
          // 注意：这一步一定要有，否则，form 不知道要操作哪个 Form 组件！
          form={form}
          onFinish={onFinish}
          // 为表单添加默认值
          initialValues={{
            mobile: '13911111111',
            code: '246810',
          }}
        >
          {/* 手机号 */}
          <Form.Item
            className="login-item"
            name="mobile"
            rules={[
              // 必填项
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' },
            ]}
          >
            {/* { pattern: /^1[3-9]\d{9}$/, message: "手机号格式错误" }, */}
            <Input placeholder="请输入手机号" maxLength={11} ref={inputRef} />
          </Form.Item>

          {/* 验证码 */}
          <Form.Item
            className="login-item"
            name="code"
            rules={[
              { required: true, message: '请输入验证码' },
              // len 表示长度校验
            ]}
            // 表单项右侧额外的信息
            extra={
              <span
                onClick={time === 0 ? onGetCode : undefined}
                className="code-extra"
              >
                {time === 0 ? '获取验证码' : time + 's后重新获取'}
              </span>
            }
          >
            {/* { len: 6, message: "验证码长度为6位" }, */}
            {/* autoComplete 自动完成，如果开启，表单提交过的一些信息，此处就会提示 */}
            <Input
              placeholder="请输入验证码"
              autoComplete="off"
              maxLength={6}
            />
          </Form.Item>
          {/* 登录按钮 */}
          {/* noStyle 表示不提供 Form.Item 自带的样式 */}
          {/* shouldUpdate 此时，表示：希望表单任意变化都对某一个区域进行渲染 */}
          <Form.Item noStyle shouldUpdate>
            {() => {
              // form.isFieldsTouched / form.getFieldsError 都是 Form 组件的实例方法
              // 1 form.isFieldsTouched(true)
              //  作用：检查表单中的所有表单项是否被用户操作过，
              //       如果所有表单项都操作过，结果为：true；否则，结果为：false
              // console.log(form.isFieldsTouched(true))
              //  !form.isFieldsTouched(true) 表示第一次渲染组件，并且用户没有操作过表单项，此时，按钮为：禁用
              const isTouched = !form.isFieldsTouched(true)
              console.log(isTouched, 'isTouched')

              // 2 form.getFieldsError()
              //  作用：获取所有表单项对应的错误信息
              // console.log(form.getFieldsError())
              // !!form.getFieldsError().filter(({ errors }) => errors.length).length
              // 判断表单项中错误信息的长度，如果有错误，结果为：true；否则，结果为：false
              const hasError =
                form.getFieldsError().filter(({ errors }) => errors.length > 0)
                  .length > 0

              return (
                <Button
                  block
                  type="submit"
                  color="primary"
                  className="login-submit"
                  // 是否禁用，如果值为 true 表示：禁用；否则，表示：启用
                  disabled={!isTouched || hasError}
                >
                  登 录
                </Button>
              )
            }}
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
