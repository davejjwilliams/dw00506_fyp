import { ADD_PRODUCT } from '../types';

const productReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    default:
      return state;
  }
};

export default productReducer;
