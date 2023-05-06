import { Box, Container, Typography } from '@mui/material';
import PieChart from '../../components/charts/PieChart';
import BarChart from '../../components/charts/BarChart';
import Content from '../../components/Content';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import empty_vote from '../../assets/vote_empty.svg';

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h6" paragraph>
        Dashboard
      </Typography>
      <Content>
        <Typography>Voting System</Typography>
      </Content>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
          columnGap: 2,
        }}
      >
        <PieChart />
        <BarChart />
      </Box>
      <CustomizedMaterialTable
        addButtonImg={empty_vote}
        addButtonMessage="No records found"
        columns={[]}
        data={[]}
        actions={[]}
      />
    </Box>
  );
};

export default Dashboard;
