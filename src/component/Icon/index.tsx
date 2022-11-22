import React from "react";
type Props = {
  className?: string;
  type: string;
  onClick?: () => void;
};
function Icon(props: Props) {
  console.log(props, 11);
  return (
    <svg
      onClick={props.onClick}
      className={"icon " + props.className}
      aria-hidden="true"
    >
      <use xlinkHref={`#${props.type}`}></use>
    </svg>
  );
}
export default Icon;
