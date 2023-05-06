import PropTypes from 'prop-types';

import CloseSharp from '@mui/icons-material/CloseSharp';
import { DialogTitle, IconButton, Stack, Typography } from '@mui/material';

function CustomDialogTitle({ title, icon, onClose }) {
  return (
    <DialogTitle>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" columnGap={1}>
          {icon}
          <Typography variant="h5">{title}</Typography>
        </Stack>
        {onClose && (
          <IconButton onClick={onClose}>
            <CloseSharp />
          </IconButton>
        )}
      </Stack>
      {/* <Divider /> */}
    </DialogTitle>
  );
}

CustomDialogTitle.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
};

export default CustomDialogTitle;
