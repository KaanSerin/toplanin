const initialState = {
  registration: {
    avatar: null,
    reason: null,
    interests: null,
    topics: null,
    groups: null,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'registration/updateAvatar':
      return {
        ...state,
        registration: { ...state.registration, avatar: action.payload },
      };

    case 'registration/updateReason':
      return {
        ...state,
        registration: { ...state.registration, reason: action.payload },
      };

    case 'registration/updateInterests':
      return {
        ...state,
        registration: { ...state.registration, interests: action.payload },
      };

    case 'registration/updateTopics':
      return {
        ...state,
        registration: { ...state.registration, topics: action.payload },
      };

    case 'registration/updateGroups':
      return {
        ...state,
        registration: { ...state.registration, groups: action.payload },
      };

    default:
      return state;
  }
};

export default reducer;
