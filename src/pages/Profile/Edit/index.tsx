import useInitialState from '@/Hooks/useInitialState'
import { editUserInfo, getUserProfile } from '@/store/actions/profile1'
import { Button, DatePicker, List, NavBar, Picker, Popup, Toast } from 'antd-mobile'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import EditInput from './components/EditInput/EditInput'
import styles from './index.module.scss'
const Item = List.Item
type inputTypes = {
  type: '' | 'name' | 'intro'
  visible: boolean
}
export default function Edit() {
  const dispatch = useDispatch<any>()
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState<(string | null)[]>(['M'])
  const [inputPopup, setInputPopup] = useState<inputTypes>({
    type: '',
    visible: false,
  })
  // 进去页面拿到数据
  const { profileEdit: userEdit } = useInitialState(editUserInfo, 'profile')
  // 关闭弹层
  const onInputHide = () => {
    setInputPopup({
      type: '',
      visible: false,
    })
  }
  // 修改 昵称和简介
  const onUpdate = async (type: '' | 'name' | 'intro', value: string) => {
    try {
      await dispatch(getUserProfile(type, value))
      Toast.show({ content: '修改成功' })
      onInputHide()
    } catch (err) {
      Toast.show({ content: '修改失败' })
    }
  }
  // 退出登录
  const onLogout = () => {}
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 标题 */}
        <NavBar
          style={
            {
              // '--border-bottom': '1px solid red',
            }
          }
        >
          个人信息
        </NavBar>

        <div className="wrapper">
          {/* 列表 */}
          <List className="profile-edit-list">
            {/* 列表项 */}
            <Item
              extra={
                <span className="avatar-wrapper">
                  <img
                    width={24}
                    height={24}
                    src={
                      userEdit.photo ||
                      'http://toutiao.itheima.net/images/user_head.jpg'
                    }
                    alt=""
                  />
                </span>
              }
              arrow
            >
              头像
            </Item>
            <Item
              arrow
              extra={userEdit.name}
              onClick={() => {
                setInputPopup({ visible: true, type: 'name' })
              }}
            >
              昵称
            </Item>
            <Item
              arrow
              onClick={() => {
                setInputPopup({ visible: true, type: 'intro' })
              }}
              extra={<span>{userEdit.intro || '未填写'}</span>}
            >
              简介
            </Item>
          </List>

          <List className="profile-edit-list">
            <Item arrow extra={userEdit.gender === 0 ? '男' : '女'}>
              性别
            </Item>
            <Item arrow extra={userEdit.birthday}>
              生日
            </Item>
          </List>

          <DatePicker
            visible={false}
            value={new Date()}
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
          />
        </div>

        <div className="logout">
          <Button className="btn" onClick={onLogout}>
            退出登录
          </Button>
        </div>
      </div>

      {/* 修改昵称 或 简介的弹层 */}
      {/* destroyOnClose 表示：弹出层组件内容在关闭时销毁 */}
      {/* <Popup visible={inputPopup.visible} position="right" destroyOnClose> */}
      <Popup visible={inputPopup.visible} position="right" destroyOnClose>
        <EditInput
          onInputHide={onInputHide}
          onUpdate={onUpdate}
          type={inputPopup.type}
        />
      </Popup>
      {/* // 日期选择器 */}
      {/* <Picker
        visible={true}
        onClose={() => {
          setVisible(false)
        }}
        value={value}
        onConfirm={(v) => {
          setValue(v)
        }}
      /> */}
    </div>
  )
}
