import styles from './index.module.scss'
const EditList = ({ config, onInputHide, type }) => {

  const list = config[type]
  return (
    <div className={styles.root}>
      {list && list.map((item) => (
        <div key={item.title} className="list-item" onClick={item.onClick}>
          {item.title}
        </div>
      ))}

      <div className="list-item" onClick={onInputHide}>
        取消
      </div>
    </div>
  )
}
export default EditList
