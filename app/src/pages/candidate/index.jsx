import { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Divider, Stack, Tab, Typography } from '@mui/material';
import Content from '../../components/Content';
import President from '../president';
import Parliamentarian from '../parliamentarian';

const Candidate = () => {
  const [tab, setTab] = useState('1');
  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
        }}
      >
        <Content sx={{ padding: 2 }}>
          <Box>
            <Stack>
              <Typography variant="h3">Candidates</Typography>
              <Typography variant="body2" paragraph>
                Lorem ipsum dolor sit amet consectetur adipiscing elit
              </Typography>
            </Stack>
          </Box>
          <Divider />
        </Content>
        <Content>
          <TabContext value={tab}>
            <TabList onChange={(e, value) => setTab(value)}>
              <Tab label="President" value="1" />
              <Tab label="Parliamentarian" value="2" />
            </TabList>
            <TabPanel value="1">
              <President />
            </TabPanel>
            <TabPanel value="2">
              <Parliamentarian />
            </TabPanel>
          </TabContext>
        </Content>
      </Box>
    </>
  );
};

export default Candidate;
