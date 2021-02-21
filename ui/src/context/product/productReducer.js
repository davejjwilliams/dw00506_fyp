import {
  ADD_PRODUCT,
  CLEAR_PRODUCTS,
  GET_PRODUCTS,
  ADD_MESSAGE,
  GET_PRODUCT,
  GET_MESSAGES,
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
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false
      };
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
        loading: false
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [action.payload, ...state.messages]
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
