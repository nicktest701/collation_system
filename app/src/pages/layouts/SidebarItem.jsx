import { Typography, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';

const SidebarItem = ({ to, title, icon }) => {
  const {
    palette: { primary },
  } = useTheme();
  const style = ({ isActive }) => {
    return {
      borderRight: isActive ? `2px solid ${primary.main}` : null,
      // backgroundColor: isActive ? `${primary.lighter}` : null,
    };
  };

  return (
    <NavLink className="sidebar-item" style={style} to={to} end>
      {icon}
      <Typography variant="body2" whiteSpace="nowrap">
        {title}
      </Typography>
    </NavLink>
  );
};

export default SidebarItem;
