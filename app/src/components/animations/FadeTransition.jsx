import { forwardRef } from 'react';
import { Fade } from '@mui/material';

const FadeTransition = forwardRef(function FadeTransition(props, ref) {
  return <Fade appear ref={ref} {...props} />;
});

export default FadeTransition;
