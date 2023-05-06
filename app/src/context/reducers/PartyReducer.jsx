export const PartyReducer = (state, { type, payload }) => {
  switch (type) {
    case 'edit-party':
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
