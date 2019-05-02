import initialState from '../initialState'
import {

  UPDATE_BIRTHDAY,
  UPDATE_IMAGE,
  UPDATE_TIMEANDPLACE,
  UPDATE_FUNDRAISER,
  UPDATE_GUEST_USER_DETAILS

} from './BirthdayActions'


export default function (state = initialState.birthday, action) {
  switch (action.type) {

    case UPDATE_BIRTHDAY:
      return { ...state, birthdayEvent: { ...state.birthdayEvent, ...action.data } }

    case UPDATE_IMAGE:
      return { ...state, birthdayImage: action.data }

    case UPDATE_TIMEANDPLACE:
      return { ...state, birthdayTimeAndPlace: { ...state.birthdayTimeAndPlace, ...action.data } }

    case UPDATE_FUNDRAISER:
      return { ...state, fundraiser: { ...state.fundraiser, ...action.data } }

    case UPDATE_GUEST_USER_DETAILS:
      return { ...state, guestUser: { ...state.guestUser, ...action.data } }

    default:
      return state

  }

}

