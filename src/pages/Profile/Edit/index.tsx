import useInitialState from '@/Hooks/useInitialState'
import { logout } from '@/store/actions/login'
import { editUserInfo, getUserProfile } from '@/store/actions/profile1'
import {
  Button,
  DatePicker,
  Dialog,
  List,
  NavBar,
  Picker,
  Popup,
  Toast,
} from 'antd-mobile'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import EditInput from './components/input/EditInput'
import styles from './index.module.scss'
const Item = List.Item
type inputTypes = {
  type: '' | 'name' | 'intro'
  visible: boolean
}
function formatDate(value: Date) {
  const year = value.getFullYear()
  let mouth: number | string = value.getMonth() + 1
  mouth = mouth > 9 ? mouth : `0${mouth}`
  let day: number | string = value.getDate()
  day = day > 9 ? day : `0${day}`
  const d = [year, mouth, day].join('-')
  return d
}
export default function Edit() {
  const history = useHistory()
  const dispatch = useDispatch<any>()
  const [visibleBirthday, setVisible] = useState(false)
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
  // 修改生日
  const onUpdateBirthday = async (value: Date) => {
    const d = formatDate(value)
    console.log(d, 'date')
    // 1.掉接口
    // // 2.关闭弹框
    try {
      await dispatch(getUserProfile('birthday', d))
      Toast.show({ content: '修改成功' })
      setVisible(false)
    } catch (err) {
      Toast.show({ content: '修改失败' })
    }
  }
  // 退出登录
  const onLogout = () => {
    Dialog.confirm({
      content: '确认退出吗',
      onConfirm: async () => {
        // await sleep(3000)
        dispatch(logout())
        Toast.show({
          icon: 'success',
          content: '退出成功',
          position: 'bottom',
        })
        history.push('/login')
      },
    })
  }
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 标题 */}
        <NavBar
        onBack={()=>history.go(-1)}
          style={
            {
              '--border-bottom': '1px solid red',
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
            <Item
              arrow
              extra={userEdit.birthday}
              onClick={() => {
                setVisible(true)
              }}
            >
              生日
            </Item>
          </List>

          {/* <DatePicker
            visible={false}
            value={new Date()}
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
          /> */}
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
      <DatePicker
        visible={visibleBirthday}
        onClose={() => {
          setVisible(false)
        }}
        title="选择年月日"
        value={new Date(userEdit.birthday)}
        max={new Date()}
        min={new Date('1900-01-01')}
        onConfirm={onUpdateBirthday}
      />
    </div>
  )
}
