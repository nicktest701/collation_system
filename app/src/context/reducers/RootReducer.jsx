export const RootReducer = (state, { type, payload }) => {
  switch (type) {
    case 'showAlert':
      return {
        ...state,
        alert: {
          open: true,
          severity: payload.severity,
          message: payload.message,
        },
      };

    case 'closeAlert':
      return {
        ...state,
        alert: {
          open: false,
          severity: 'info',
          message: '',
        },
      };

    default:
      return state;
  }
};
