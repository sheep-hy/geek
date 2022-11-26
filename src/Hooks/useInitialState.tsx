import { RootState } from '@/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// name只能是rootstate对象中的属性名
export default function useInitialState<name extends keyof RootState>(action:()=>void, stateName:name) {
  const dispatch = useDispatch<any>()
  useEffect(()=>{
    dispatch(action())
  },[dispatch,action])
  // stateName的值就是rootstate里面的属性名
  const state=useSelector((state:RootState)=>state[stateName])
  return state
}
