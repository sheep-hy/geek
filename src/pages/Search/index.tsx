import Icon from '@/components/Icon'
import NavBar from '@/components/NavBar'
import styles from './index.module.scss'
import classnames from 'classnames'
import { useHistory } from 'react-router'

// import { useState, useRef, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

const Search = () => {
  const history = useHistory()
  // const [keyword, setKeyword] = useState('')
  // const dispatch = useDispatch()
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar
        className="navbar"
        onLeftClick={() => history.go(-1)}
        extra={<span className="search-text">搜索</span>}
      >
        <div className="navbar-search">
          <Icon type="iconbtn_search" className="icon-search" />
          <div className="input-wrapper">
            {/* 输入框 */}
            <input type="text" placeholder="请输入关键字搜索" />
            {/* 清空输入框按钮 */}
            <Icon type="iconbtn_tag_close" className="icon-close" />
          </div>
        </div>
      </NavBar>
      {/* 搜索历史 */}
      <div className="history" style={{ display: false ? 'none' : 'block' }}>
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
          show: false,
        })}
      >
        <div className="result-item">
          <Icon className="icon-search" type="iconbtn_search" />
          <div className="result-value"></div>
        </div>
      </div>
    </div>
  )
}

export default Search
