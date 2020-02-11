const userDefaultState = {
  userData: {}
};

export default (state = userDefaultState, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return { ...state, userData: action.payload.userData };
    default:
      return state;
  }
};
