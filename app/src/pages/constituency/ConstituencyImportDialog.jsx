import { UploadRounded } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ConstituencyContext } from '../../context/providers/ConstituencyProvider';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import { RootContext } from '../../context/providers/RootProvider';
import { postConstituency } from '../../api/constituencyAPI';
import {
  alertError,
  alertSuccess,
} from '../../components/alerts/globalAlertActions';

const ConstituencyImportDialog = () => {
  const queryClient = useQueryClient();
  const { rootDispatch } = useContext(RootContext);

  const {
    constituencyState: { constituencyFromFile, openFileDialog },

    constituencyDispatch,
  } = useContext(ConstituencyContext);

  const handleClose = () => {
    constituencyDispatch({
      type: 'open-constituency-file-dialog',
      payload: false,
    });
  };

  // ADD New Session
  const { mutateAsync } = useMutation({
    mutationFn: postConstituency,
  });

  const onSubmit = () => {
    console.log(constituencyFromFile);

    Swal.fire({
      title: 'Deleting Candidate',
      text: 'Do you want to delete?',
      showCancelButton: true,
      // backdrop:false
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutateAsync(constituencyFromFile, {
          onSettled: () => {
            queryClient.invalidateQueries(['constituencies']);
          },
          onSuccess: (data) => {
            rootDispatch(alertSuccess(data));
            handleClose();
          },
          onError: (error) => {
            rootDispatch(alertError(error));
          },
        });
      }
    });
  };

  return (
    <Dialog open={openFileDialog} maxWidth="md" fullWidth>
      <DialogActions sx={{ padding: 4 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <LoadingButton
          variant="contained"
          startIcon={<UploadRounded />}
          onClick={onSubmit}
        >
          Import Constituency
        </LoadingButton>
      </DialogActions>
      <DialogContent>
        <CustomizedMaterialTable
          title="Constituencies"
          columns={[
            {
              title: 'Code',
              field: 'code',
            },
            {
              title: 'Constituency',
              field: 'name',
            },

            {
              title: 'Region',
              field: 'region',
            },

            {
              title: 'Eligible Voters',
              field: 'voters',
            },
          ]}
          data={constituencyFromFile}
          actions={[]}
          options={{
            // paging: false,
            exportButton: false,
            header: true,
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ConstituencyImportDialog;
