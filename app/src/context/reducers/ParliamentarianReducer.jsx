export const ParliamentarianReducer = (state, { type, payload }) => {
  switch (type) {
    case 'view-parliamentarian':
      return {
        ...state,
        viewData: {
          open: payload.open,
          data: payload.data,
        },
      };
    case 'edit-parliamentarian':
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
