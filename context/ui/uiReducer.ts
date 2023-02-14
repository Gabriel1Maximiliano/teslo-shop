

import { UIState } from './UIProvider';

type UITypeAtion =
|{type:'[UI]-Toggle-Menu'}

export const uiReducer = ( state:UIState,action: UITypeAtion ):UIState => {
  
  switch (action.type) {
    case '[UI]-Toggle-Menu':
      return{
        ...state,
        isMenuOpen: !state.isMenuOpen
      }


    default:
        return state;
  }
}
