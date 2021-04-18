import {
  ADD_PRODUCT,
  CLEAR_PRODUCTS,
  GET_PRODUCTS,
  ADD_MESSAGE,
  GET_PRODUCT,
  GET_MESSAGES,
  PRODUCT_ERROR,
  CLEAR_PRODUCT_ERRORS,
  RESET_FORM_SUCCESS
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
        messages: [action.payload, ...state.messages],
        formSuccess: true
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
        loading: false,
        formSuccess: true
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
    case CLEAR_PRODUCT_ERRORS:
      return {
        ...state,
        error: null
      };
    case RESET_FORM_SUCCESS:
      return {
        ...state,
        formSuccess: false
      };
    default:
      return state;
  }
};

export default productReducer;
