import React from 'react'
import ArticleItem from '../ArticleItem'
import styles from './index.module.scss'

export default function ArticleList() {
  return (
    <div className={styles.root}>
      <div className="articles">
   
        <div className="article-item">
          <ArticleItem ></ArticleItem>
          <ArticleItem ></ArticleItem>
          <ArticleItem ></ArticleItem>
          <ArticleItem ></ArticleItem>
        </div>
      </div>
    </div>
  )
}
