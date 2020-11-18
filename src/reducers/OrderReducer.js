const types = {
  ADD_ORDER: 'ADD_ORDER',
  REMOVE_ORDER: 'REMOVE_ORDER',
  UPDATE_ORDER_STATUS: 'UPDATE_ORDER_STATUS',
};

export const actions = {
  AddOrder(dispatch, order) {
    dispatch({
      type: types.ADD_ORDER,
      payload: order,
    });
  },
  RemoveOrder(dispatch) {
    dispatch({
      type: types.REMOVE_ORDER,
    });
  },
  UpdateOrderStatus(dispatch, status) {
    dispatch({
      type: types.UPDATE_ORDER_STATUS,
      payload: status,
    });
  },
};

const initialState = {
  order: null,
  hasOrder: false,
  orderStatus: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_ORDER: {
      return {
        ...state,
        order: action.payload,
        hasOrder: true,
      };
    }
    case types.REMOVE_ORDER: {
      return {
        ...state,
        order: null,
        hasOrder: false,
      };
    }
    case types.UPDATE_ORDER_STATUS: {
      return {
        ...state,
        orderStatus: action.payload,
      };
    }
    default:
      return state;
  }
};
