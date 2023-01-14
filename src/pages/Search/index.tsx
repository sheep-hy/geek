import Icon from '@/components/Icon'
import NavBar from '@/components/NavBar'
import styles from './index.module.scss'
import classnames from 'classnames'
import { useHistory } from 'react-router'
// import { NavBar, Search } from 'antd-mobile'
import { Input } from 'antd-mobile'

import { useState, useRef, useEffect } from 'react'
import { useDebounceFn } from 'ahooks'
import { useDispatch, useSelector } from 'react-redux'
import { getSuggests } from '@/store/actions/search'
import { RootState } from '@/types/store'

const Search = () => {
  const history = useHistory()
  const [keyword, setKeyword] = useState('')
  const dispatch = useDispatch<any>()
  // 用户输入内容的改变
  // 当输入框文字改变 会导致整个函数组件重新刷新 导致timerId永远是-1 加个useRef(可以在多次刷新的时候 保存数据)
  // let timerId = useRef(-1)
  // const onChange = (key: string) => {
  //   // 1，保存输入内容
  //   setKeyword(key)
  //   // 2，查询联想建议信息
  //   // 防抖 自定义
  //   window.clearTimeout(timerId.current)
  //   timerId.current = window.setTimeout(() => {
  //     getSuggest()
  //   }, 50)
  // }
  const getSuggest = () => {
    console.log('这里发请求', keyword)
    dispatch(getSuggests(keyword))
  }
  const { run } = useDebounceFn(getSuggest, { wait: 500 })
  const onChange = (key: string) => {
    // 1，保存输入内容
    setKeyword(key)
    // 2，查询联想建议信息
    // 防抖 ahooks
    run()
  }
  const suggestion = useSelector((state: RootState) => state.search.suggestion)
  const onSearch = () => {
    // console.log('keyword', keyword)
    dispatch(getSuggests(keyword))
  }

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar
        className="navbar"
        onLeftClick={() => history.go(-1)}
        extra={
          <span className="search-text" onClick={onSearch}>
            搜索
          </span>
        }
      >
        <div className="navbar-search">
          <Icon type="iconbtn_search" className="icon-search" />
          <div className="input-wrapper">
            {/* 输入框  */}
            <Input
              type="text"
              value={keyword}
              onChange={onChange}
              placeholder="请输入关键字搜索"
              clearable 
            />
            {/* 清空输入框按钮 */}
            {/* <Icon type="iconbtn_tag_close" className="icon-close" /> */}
          </div>
        </div>
      </NavBar>
      {/* <NavBar
        className="navbar"
        onBack={() => history.go(-1)}
        right={<span className="search-text">搜索</span>}
      >
        <Search placeholder="请输入关键字" />
      </NavBar> */}
      {/* 搜索历史 */}
      <div className="history" style={{ display: true ? 'none' : 'block' }}>
        <div className="history-header">
          <span>搜索历史</span>
          <span>
            <Icon type="iconbtn_del" />
            清除全部
          </span>
        </div>

        <div className="history-list">
          <span className="history-item">
            <span className="divider"></span>
            你好
          </span>
        </div>
      </div>
      {/* 搜素建议结果列表 */}
      <div
        className={classnames('search-result', {
          show: true,
        })}
      >
        {suggestion.map((it, idx) => (
          <div className="result-item" key={idx}>
          <Icon className="icon-search" type="iconbtn_search" />
          <div className="result-value">{it}</div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default Search
