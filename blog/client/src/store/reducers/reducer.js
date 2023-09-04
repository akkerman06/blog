const initialState = {
  user: null,
  token: "",
  userId: null, // Добавьте это поле
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        userId: action.user.id, 
      };

    default:
      return state;
  }
};

// export const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "LOGIN_SUCCESS":
//       return {
//         ...state,
//         user: action.payload.user,
//         token: action.payload,
//         isAuthenticated: true,
//         error: null,
//       };

//       default: 
//       return state
//   }
// };
