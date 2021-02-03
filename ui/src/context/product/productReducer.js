import { ADD_PRODUCT } from '../types';

export default (state, action) => {
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
