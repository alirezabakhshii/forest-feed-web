'use client';

import ReduxFetchState from 'redux-fetch-state';
import {put, takeEvery} from 'redux-saga/effects';

import type {ProfileRes} from '@forest-feed/webServices/profile/profile';
import {FetchResult, handleFetchError, handleSagaFetchError, sagaFetch} from '@forest-feed/utils/fetch';

const Profile = new ReduxFetchState<ProfileRes, null, string>('profile');

function* watchProfile() {
  try {
    const res: FetchResult<ProfileRes> = yield sagaFetch<ProfileRes>('/users/me');
    yield put(Profile.actions.loadSuccess(res.result));
  } catch (e: any) {
    const {message} = handleFetchError(e);
    yield handleSagaFetchError(e);
    yield put(Profile.actions.loadFailure(message));
  }
}

export default function* profileSagas() {
  yield takeEvery(Profile.actionTypes.load, watchProfile);
}

export const {reducer: profileReducer, actions: profileActions, actionTypes: profileActionTypes} = Profile;
