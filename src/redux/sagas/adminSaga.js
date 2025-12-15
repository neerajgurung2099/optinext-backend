import { call, put } from "redux-saga/effects";
import { GET_ADMIN_ANALYTICS } from "@/constants/constants";
import { setLoading, setRequestStatus } from "@/redux/actions/miscActions";

import { displayActionMessage } from "@/helpers/utils";
import {
  getAdminAnalyticsSuccess,
  getAdminAnalyticsFail,
} from "@/redux/actions/adminActions";
import firebase from "@/services/firebase";

function* adminSaga({ type }) {
  switch (type) {
    case GET_ADMIN_ANALYTICS:
      try {
        yield put(setLoading(true));
        yield put(setRequestStatus(null));
        const analytics = yield call(firebase.getAdminAnalytics);
        yield put(getAdminAnalyticsSuccess(analytics));
        yield put(setLoading(false));
      } catch (e) {
        yield put(setLoading(false));
        yield put(getAdminAnalyticsFail(e.message));
        yield put(setRequestStatus(e.message || "Failed to load analytics"));
        yield call(
          displayActionMessage,
          "Failed to load Admin Analytics",
          "error",
        );
      }
      break;

    default:
      throw new Error(`Unexpected action type ${type}`);
  }
}

export default adminSaga;
