import { Avatar, Box, Container, Stack, Typography } from '@mui/material';
import {
  DashboardOutlined,
  FlagOutlined,
  InfoOutlined,
  NoteAltOutlined,
  PeopleOutlineRounded,
  SettingsOutlined,
} from '@mui/icons-material';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        borderRadius: 1,
        boxShadow: '0px 0px 13px 0px rgba(82, 63, 105, 0.05)',
        backgroundColor: 'background.paper',

        margin: 1,
      }}
    >
      <Container sx={{ height: 100, paddingY: 2 }}>
        <Typography>Voting System</Typography>
      </Container>
      <Stack>
        <SidebarItem
          to="/"
          title="Dashboard"
          icon={<DashboardOutlined color="primary" />}
        />
        <SidebarItem
          to="/constituency"
          title="Constittuencies"
          icon={<FlagOutlined color="primary" />}
        />
        <SidebarItem
          to="/party"
          title="Parties"
          icon={<FlagOutlined color="primary" />}
        />
        <SidebarItem
          to="/candidate"
          title="Candidates"
          icon={<PeopleOutlineRounded color="primary" />}
        />
        <SidebarItem
          to="/result"
          title="Results & Events"
          icon={<NoteAltOutlined color="primary" />}
        />
        <SidebarItem
          to="/settings"
          title="Settings"
          icon={<SettingsOutlined color="primary" />}
        />
        <SidebarItem
          to="/about"
          title="About"
          icon={<InfoOutlined color="primary" />}
        />
      </Stack>
      <Stack justifyContent="center" alignItems="center" spacing={1}>
        <Avatar src={null} />
        <Typography variant="caption">Nana Akwasi</Typography>
      </Stack>
    </Box>
  );
};

export default Sidebar;
