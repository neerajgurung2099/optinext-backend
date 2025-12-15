import {
  GET_ADMIN_ANALYTICS,
  GET_ADMIN_ANALYTICS_SUCCESS,
  GET_ADMIN_ANALYTICS_FAIL,
} from "@/constants/constants";

export const getAdminAnalytics = () => ({
  type: GET_ADMIN_ANALYTICS,
});

export const getAdminAnalyticsSuccess = (data) => ({
  type: GET_ADMIN_ANALYTICS_SUCCESS,
  payload: data,
});

export const getAdminAnalyticsFail = (error) => ({
  type: GET_ADMIN_ANALYTICS_FAIL,
  payload: error,
});
