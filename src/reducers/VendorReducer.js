

const types = {
    SAVE_FEATURES: 'SAVE_FEATURES',
    SAVE_VENDOR:'SAVE_VENDOR',
    SAVE_CATEGORIES: 'SAVE_CATEGORIES',
  };
  
  export const actions = {
    SaveFeatures (dispatch,features) {
      dispatch ({
        type: types.SAVE_FEATURES,
        payload: features
      });
    },
    SaveVendor (dispatch,vendor) {
      dispatch ({
        type: types.SAVE_VENDOR,
        payload: vendor
      });
    },
    SaveCategories (dispatch,categories) {
      dispatch ({
        type: types.SAVE_CATEGORIES,
        payload: categories
      });
    }
  };
  
  const initialState = {
    features:[],
    categories:[],
    Vendor:null,
  };
  
  export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_FEATURES: {
          return {
            ...state,
            features: action.payload,
          };
        }
        case types.SAVE_VENDOR: {
          return {
            ...state,
            Vendor: action.payload,
          };
        }
        case types.SAVE_CATEGORIES: {
          return {
            ...state,
            categories: action.payload,
          };
        }
      default:
        return state;
    };
    
  };
  
  