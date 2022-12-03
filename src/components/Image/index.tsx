import classnames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import Icon from '../Icon'
import styles from './index.module.scss'

type Props = {
  className?: string
  src: string
  alt: string
}
const Image = ({ className, src, alt }: Props) => {
  const imgRef = useRef<HTMLImageElement>(null)
  // 控制是否在加载
  const [loading, setLoading] = useState(true)
  // 控制是否加载失败
  const [error, setError] = useState(false)

  // 加载成功
  const onLoad = () => {
    setError(false)
    setLoading(false)
  }
  const onError = () => {
    setLoading(false)
    setError(true)
  }
  useEffect(() => {
    // 监听图片
    const current = imgRef.current!
    const observer = new IntersectionObserver((entrries) => {
      if (entrries[0].isIntersecting) {
        // 图片在可视区 current.dataset.src!说明数据不可能是undefined
        // current.src = current.dataset.src!
        current.src = current.getAttribute('data-src')!
        // 取消监听
        observer.unobserve(current)
      }
    })
    // 观察
    observer.observe(current)
  }, [])
  return (
    <div className={classnames(styles.root, className)}>
      {/* 加载中 */}
      {loading && (
        <div className="image-icon">
          <Icon type="iconphoto" />
        </div>
      )}

      {/* 加载出错时显示的内容 */}
      {error && (
        <div className="image-icon">
          <Icon type="iconphoto-fail" />
        </div>
      )}

      <img
        alt={alt}
        ref={imgRef}
        data-src={src}
        onLoad={onLoad}
        onError={onError}
      />
    </div>
  )
}

export default Image
