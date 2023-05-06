import { useContext, useEffect, useState } from 'react';

import {
  Stack,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
  FormLabel,
} from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Formik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import LoadingButton from '@mui/lab/LoadingButton';
import Transition from '../../components/animations/Transition';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
import { putParty } from '../../api/partyAPI';
import { RootContext } from '../../context/providers/RootProvider';
import { PartyContext } from '../../context/providers/PartyProvider';
import {
  alertError,
  alertSuccess,
} from '../../components/alerts/globalAlertActions';

const EditParty = () => {
  const queryClient = useQueryClient();
  const { rootDispatch } = useContext(RootContext);
  const {
    partyState: {
      editData: { open, data },
    },
    partyDispatch,
  } = useContext(PartyContext);

  const [flag, setFlag] = useState(null);
  const [name, setName] = useState('');
  const [initials, setInitials] = useState('');

  const initialValues = {
    _id: data?._id,
    flag,
    name,
    initials,
  };

  useEffect(() => {
    setFlag(data?.imageURL);
    setName(data?.name);
    setInitials(data?.initials);
  }, [data]);

  const handleClose = () =>
    partyDispatch({
      type: 'edit-party',
      payload: {
        open: false,
        data: {},
      },
    });

  // ADD New Session
  const { mutateAsync } = useMutation({
    mutationFn: putParty,
  });

  const onSubmit = (values, options) => {
    mutateAsync(values, {
      onSettled: () => {
        options.setSubmitting(false);
        queryClient.invalidateQueries(['parties']);
      },
      onSuccess: (message) => {
        handleClose();
        rootDispatch(alertSuccess(message));
      },
      onError: (error) => {
        rootDispatch(alertError(error));
      },
    });
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="xs"
      TransitionComponent={Transition}
      //   hideBackdrop
    >
      <CustomDialogTitle title="Edit Party" onClose={handleClose} />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => {
          return (
            <>
              <DialogContent>
                <Stack spacing={2} paddingY={2}>
                  <Stack
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                    paddingY={1}
                  >
                    <Avatar
                      variant="square"
                      src={flag}
                      sx={{ width: 80, height: 80 }}
                    />
                    <FormLabel
                      htmlFor="flag"
                      sx={{
                        padding: 1,
                        fontSize: 12,
                        borderRadius: 1,
                        color: 'primary.main',
                        cursor: 'pointer',
                        '&:hover': {
                          border: '1px solid primary.main',
                        },
                      }}
                    >
                      Attach Party Flag
                    </FormLabel>
                    <input
                      type="file"
                      id="flag"
                      name="flag"
                      accept=".png,.jpeg,.jpg,.webp"
                      hidden
                      onChange={(e) => {
                        setFieldValue('flag', e.target.files[0]);
                        setFlag(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                  </Stack>
                  <TextField
                    label="Party Name"
                    size="small"
                    value={values.name || ''}
                    onChange={handleChange('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    label="Party Initials"
                    size="small"
                    value={values.initials || ''}
                    onChange={handleChange('initials')}
                    error={Boolean(touched.initials && errors.initials)}
                    helperText={touched.initials && errors.initials}
                  />
                </Stack>
              </DialogContent>
              <DialogActions sx={{ padding: 2 }}>
                <LoadingButton
                  loading={isSubmitting}
                  variant="contained"
                  onClick={handleSubmit}
                  startIcon={<SaveAltIcon />}
                >
                  Save Changes
                </LoadingButton>
              </DialogActions>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default EditParty;
