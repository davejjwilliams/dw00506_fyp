import {
  ADD_PRODUCT,
  CLEAR_PRODUCTS,
  GET_PRODUCTS,
  PRODUCT_ERROR
} from '../types';

const productReducer = (state, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
        loading: false
      };
    case CLEAR_PRODUCTS:
      return {
        ...state,
        products: []
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default productReducer;
