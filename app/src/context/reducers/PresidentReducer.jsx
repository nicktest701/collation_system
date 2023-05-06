export const PresidentReducer = (state, { type, payload }) => {
  switch (type) {
    case 'view-president':
      return {
        ...state,
        viewData: {
          open: payload.open,
          data: payload.data,
        },
      };
    case 'edit-president':
      return {
        ...state,
        editData: {
          open: payload.open,
          data: payload.data,
        },
      };

    default:
      return state;
  }
};
