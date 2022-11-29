import { RootState } from '@/store'
import { InputRef, NavBar, TextAreaRef } from 'antd-mobile'

import { Input, TextArea } from 'antd-mobile'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './index.module.scss'
type Props = {
  onInputHide: () => void;
  // type: string;
  type: '' | 'name' | 'intro'
  onUpdate: (type: '' | 'name' | 'intro', value: string) => void;
}

export default function EditInput(props: Props) {
  const { onInputHide, type, onUpdate } = props
  const inputRef = useRef<InputRef>(null)
  const textRef = useRef<TextAreaRef>(null)
  const defaultValue = useSelector(
    (state: RootState) => state.profile.profileEdit[type]
  )
  const [value, setValue] = useState(defaultValue || '')
  const right = (
    <span
      className="commit-btn"
      onClick={() => {
        onUpdate(type, value)
      }}
    >
      提交
    </span>
  )
  useEffect(() => {
    inputRef.current?.focus()
    textRef.current?.focus()
    // HTMLInputElement.setSelectionRange()方法用于设定<input><textArae>元素中当前选中文本的歧视和结束位置
    //-1,-1 展示起点和结束的光标都在最后面
    document.querySelector('textarea')?.setSelectionRange(-1, -1)
  }, [])
  return (
    <div className={styles.root}>
      <NavBar className="navbar" right={right} onBack={onInputHide}>
        {type === 'name' ? '昵称' : '简介'}
      </NavBar>
      <div className="content-box">
        <h3>{type === 'name' ? '昵称' : '简介'}</h3>
        <div className="input-wrap">
          {type === 'name' ? (
            <Input
              ref={inputRef}
              placeholder="请输入"
              value={value}
              onChange={(str) => setValue(str)}
            ></Input>
          ) : (
            <TextArea
              ref={textRef}
              showCount
              maxLength={30}
              value={value}
              onChange={(str) => setValue(str)}
            ></TextArea>
          )}
        </div>
      </div>
    </div>
  )
}
