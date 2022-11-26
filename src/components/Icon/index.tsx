import React from 'react'
type Props = {
  className?: string
  type: string
  onClick?: () => void
}
function Icon(props: Props) {
  return (
    <svg
      onClick={props.onClick}
      className={'icon ' + props.className}
      aria-hidden="true"
    >
      <use xlinkHref={`#${props.type}`}></use>
    </svg>
  )
}
export default Icon
