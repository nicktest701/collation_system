import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Sidebar from './Sidebar';
import Footer from './Footer';
import GlobalAlert from '../../components/alerts/GlobalAlert';

const Layout = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: '1fr auto',
        minHeight: '100%',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
        }}
      >
        <Sidebar />
        <Container>
          <Outlet />
        </Container>
      </Box>
      <Footer />
      <GlobalAlert />
    </Box>
  );
};

export default Layout;
