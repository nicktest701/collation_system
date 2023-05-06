import { Box, Container } from '@mui/material';
import { forwardRef } from 'react';
import AnimatedContainer from './animations/AnimatedContainer';

const Content = forwardRef((props, ref) => {
  return (
    <Container
      ref={ref}
      sx={{
        padding: 1,
        marginY: 1,
        borderRadius: 1,
        boxShadow: ' 0 4px 30px  hsl(174, 75%, 38%,0.1)',
        backdropFilter: ' blur(5px)',
        WebkitBackdropFilter: ' blur(5px)',
        border: 'border: 1px solid hsl(174, 75%, 38%,0.3)',
        backgroundColor: 'background.paper',
        ...props.sx,
      }}
    >
      <AnimatedContainer>{props.children}</AnimatedContainer>
    </Container>
  );
});

export default Content;
