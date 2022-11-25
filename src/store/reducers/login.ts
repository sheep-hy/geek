import { RootAction } from "@/types/store";

const initialState = {};
const login = (state = initialState, action: RootAction) => {
    if(action.type==='login/token'){
        return action.payload
    }
  return state;
};
export default login;
