import {
  GET_ADMIN_ANALYTICS_SUCCESS,
  GET_ADMIN_ANALYTICS_FAIL,
} from "@/constants/constants";

const INITIAL_STATE = {
  stats: {
    user: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  },
  monthlyUsers: [],
  monthlyRevenue: [],
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ADMIN_ANALYTICS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        error: null,
      };
    case GET_ADMIN_ANALYTICS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
