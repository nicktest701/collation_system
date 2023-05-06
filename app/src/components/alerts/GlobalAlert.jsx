import { useContext } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import ErrorRounded from '@mui/icons-material/ErrorRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import Transition from '../animations/Transition';
import { RootContext } from '../../context/providers/RootProvider';

const GlobalAlert = () => {
  const {
    rootState: { alert },
    rootDispatch,
  } = useContext(RootContext);

  const handleClose = () => {
    rootDispatch({ type: 'closeAlert' });
  };
  const borderColor = alert?.severity === 'error' ? '#B72136' : '#18aa9b';

  return (
    <Snackbar
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'top',
      }}
      open={!!alert?.open}
      // open={true}
      autoHideDuration={5000}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <Alert
        icon={
          alert?.severity === 'info' ? (
            <CheckCircleRounded color="primary" />
          ) : (
            <ErrorRounded />
          )
        }
        // severity={'error'}
        severity={alert?.severity}
        onClose={handleClose}
        sx={{
          width: '100%',
          borderLeft: `2px solid ${borderColor}`,
          height: 60,
          zIndex: 999999999,
          backgroundColor:
            alert?.severity === 'error' ? null : 'background.main',
          color: alert?.severity === 'error' ? '#B72136' : 'hsl(174, 75%, 38%)',
          boxShadow: '0px 0px 13px 0px rgba(82, 63, 105, 0.05)',
        }}
      >
        {typeof alert?.message === 'string' ? alert?.message : ''}
      </Alert>
    </Snackbar>
  );
};

export default GlobalAlert;
