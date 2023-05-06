export const ConstituencyReducer = (state, { type, payload }) => {
  switch (type) {
    case 'open-constituency-file-dialog':
      return {
        ...state,
        openFileDialog: payload,
      };
    case 'get-constituency-from-file':
      return {
        ...state,
        constituencyFromFile: payload,
      };

    default:
      return state;
  }
};
