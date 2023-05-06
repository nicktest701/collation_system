import React, { useContext, useState } from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Content from '../../components/Content';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import empty_vote from '../../assets/vote_empty.svg';
import AddParty from './AddParty';
import { getAllParties } from '../../api/partyAPI';
import { PARTY_COLUMNS } from '../../components/tables/columns';
import EditParty from './EditParty';
import { PartyContext } from '../../context/providers/PartyProvider';

const Party = () => {
  const { partyDispatch } = useContext(PartyContext);
  const [openAddParty, setOpenAddParty] = useState(false);

  const parties = useQuery({
    queryKey: ['parties'],
    queryFn: () => getAllParties(),
  });

  const editParty = (data) =>
    partyDispatch({
      type: 'edit-party',
      payload: {
        open: true,
        data,
      },
    });

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          paddingY: 2,
        }}
      >
        <Content sx={{ padding: 1 }}>
          <Box>
            <Stack>
              <Typography variant="h3">Party</Typography>
              <Typography variant="body2" paragraph>
                Lorem ipsum dolor sit amet consectetur adipiscing elit
              </Typography>
            </Stack>
          </Box>
          <Divider />
        </Content>

        <CustomizedMaterialTable
          title="Parties"
          isLoading={parties.isLoading}
          addButtonImg={empty_vote}
          addButtonMessage="No Party records found"
          showAddButton
          onAddButtonClicked={() => setOpenAddParty(true)}
          addButtonText="New Party"
          columns={PARTY_COLUMNS(editParty)}
          data={parties.data}
          actions={[]}
        />

        <AddParty open={openAddParty} setOpen={setOpenAddParty} />
        <EditParty />
        
      </Box>

    </>
  );
};

export default Party;
