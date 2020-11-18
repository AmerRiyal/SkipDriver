

const types = {
  CHANGE_SHOW: 'CHANGE_SHOW',
  USER_LOGIN_SUCCESS :'USER_LOGIN_SUCCESS',
  USER_LOGOUT:'USER_LOGOUT',
  SHOP_ADD_ITEM:'SHOP_ADD_ITEM',
};

export const actions = {
  Login (dispatch,user) {
    dispatch ({
      type: types.USER_LOGIN_SUCCESS,
      payload: user
    });
  },
  Logout (dispatch) {
    dispatch ({
      type: types.USER_LOGOUT,
    });
  },
  ShopAddItem(dispatch) {
    dispatch ({
      type: types.SHOP_ADD_ITEM,
    });
  },
};

const initialState = {
  isLoggedIn: false,
  user:{},
  hasItem:false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
      case types.USER_LOGIN_SUCCESS: {
        return {
          ...state,
          user: action.payload,
          isLoggedIn: true,
        };
      }
      case types.SAVE_USER_TOKEN: {
        return {
          ...state,
          userToken: action.Token,
        };
      }
      case types.USER_LOGOUT:{
        return{
          ...state,
          user: {}, 
          isLoggedIn: false
        }
      }
      case types.SHOP_ADD_ITEM:{
        return{
          ...state,
          hasItem:true,
        }
      }
    default:
      return state;
  };
  
};

