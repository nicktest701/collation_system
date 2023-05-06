import { useContext, useState } from 'react';

import {
  Stack,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
  FormLabel,
  Typography,
  MenuItem,
  Autocomplete,
  Button,
  InputAdornment,
} from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Formik } from 'formik';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingButton from '@mui/lab/LoadingButton';
import { Person2Rounded } from '@mui/icons-material';
import Transition from '../../components/animations/Transition';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
import { RootContext } from '../../context/providers/RootProvider';
import {
  alertError,
  alertSuccess,
} from '../../components/alerts/globalAlertActions';
import { postParliamentarian } from '../../api/parliamentarianAPI';
import CustomFormControl from '../../components/inputs/CustomFormControl';
import { TOWNS } from '../../config/towns';
import { REGIONS } from '../../config/regions';
import CustomDatePicker from '../../components/inputs/CustomDatePicker';
import CustomImageChooser from '../../components/inputs/CustomImageChooser';

import AnimatedContainer from '../../components/animations/AnimatedContainer';
import { getAllParties } from '../../api/partyAPI';

const AddParliamentarian = ({ open, setOpen }) => {
  const queryClient = useQueryClient();
  const { rootDispatch } = useContext(RootContext);

  const [profileImg, setProfileImg] = useState(null);
  const [dob, setDob] = useState(null);

  const initialValues = {
    profile: null,
    firstname: '',
    surname: '',
    othername: '',
    dateofbirth: dob,
    gender: '',
    email: '',
    phonenumber: '',
    placeofbirth: '',
    address: '',
    region: '',
    party: {
      _id: '',
      name: '',
      imageURL: '',
      initials: '',
    },
  };

  const parties = useQuery({
    queryKey: ['parties'],
    queryFn: () => getAllParties(),
  });

  const handleClose = () => setOpen(false);

  // ADD New Session
  const { mutateAsync } = useMutation({
    mutationFn: postParliamentarian,
  });

  const onSubmit = (values, options) => {
    const partyId = values.party._id;
    values.dateofbirth = dob?.format('L');
    values.party = partyId;


    mutateAsync(values, {
      onSettled: () => {
        options.setSubmitting(false);
        queryClient.invalidateQueries(['parliamentarians']);
      },
      onSuccess: (data) => {
        handleClose();
        rootDispatch(alertSuccess(data));
      },
      onError: (error) => {
        rootDispatch(alertError(error));
      },
    });
    // options.setSubmitting(false);
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="md"
      TransitionComponent={Transition}
      //   hideBackdrop
    >
      <CustomDialogTitle
        title="New Parliamentarianial Candidate"
        icon={<Person2Rounded color="primary" />}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        // enableReinitialize={true}
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
          const handleImageUpload = (e) => {
            setFieldValue('profile', e.target.files[0]);
            setProfileImg(URL.createObjectURL(e.target.files[0]));
          };

          return (
            <>
              <AnimatedContainer>
                <DialogContent>
                  <Stack padding={2} spacing={1}>
                    <Stack sx={{ position: 'relative' }}>
                      <Avatar
                        src={profileImg}
                        sx={{ width: 100, height: 100, alignSelf: 'center' }}
                      />
                      <CustomImageChooser
                        handleImageUpload={handleImageUpload}
                      />
                    </Stack>
                    <Typography
                      variant="body2"
                      color="primary.main"
                      sx={{ fontWeight: 'bold' }}
                    >
                      Personal information
                    </Typography>
                    <CustomFormControl>
                      <TextField
                        label="Firstname"
                        type="text"
                        fullWidth
                        size="medium"
                        value={values.firstname}
                        onChange={handleChange('firstname')}
                        error={Boolean(touched.firstname && errors.firstname)}
                        helperText={touched.firstname && errors.firstname}
                      />
                      <TextField
                        label="Surname"
                        fullWidth
                        size="medium"
                        value={values.surname}
                        onChange={handleChange('surname')}
                        error={Boolean(touched.surname && errors.surname)}
                        helperText={touched.surname && errors.surname}
                      />
                      <TextField
                        label="Othername"
                        fullWidth
                        size="medium"
                        value={values.othername}
                        onChange={handleChange('othername')}
                        error={Boolean(touched.othername && errors.othername)}
                        helperText={touched.othername && errors.othername}
                      />
                    </CustomFormControl>
                    <CustomFormControl>
                      <CustomDatePicker
                        label="Date of Birth"
                        date={dob}
                        setDate={setDob}
                        disableFuture={true}
                        touched={Boolean(
                          touched.dateofbirth && errors.dateofbirth
                        )}
                        error={touched.dateofbirth && errors.dateofbirth}
                      />

                      <TextField
                        label="Gender"
                        select
                        fullWidth
                        size="medium"
                        value={values.gender}
                        onChange={handleChange('gender')}
                        error={Boolean(touched.gender && errors.gender)}
                        helperText={touched.gender && errors.gender}
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </TextField>
                    </CustomFormControl>
                    <CustomFormControl>
                      <TextField
                        label="Email"
                        fullWidth
                        size="medium"
                        row={3}
                        maxRows={3}
                        value={values.email}
                        onChange={handleChange('email')}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                      />
                      <TextField
                        label="Telephone No."
                        inputMode="tel"
                        type="tel"
                        fullWidth
                        size="medium"
                        value={values.phonenumber}
                        onChange={handleChange('phonenumber')}
                        error={Boolean(
                          touched.phonenumber && errors.phonenumber
                        )}
                        helperText={touched.phonenumber && errors.phonenumber}
                      />
                    </CustomFormControl>
                    <TextField
                      label="Address"
                      fullWidth
                      size="medium"
                      row={3}
                      maxRows={3}
                      value={values.address}
                      onChange={handleChange('address')}
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
                    />
                    <CustomFormControl>
                      <Autocomplete
                        freeSolo
                        fullWidth
                        size="medium"
                        options={TOWNS}
                        loadingText="Please wait...."
                        noOptionsText="No Town available"
                        getOptionLabel={(option) => option || ''}
                        value={values.placeofbirth}
                        onChange={(e, value) =>
                          setFieldValue('placeofbirth', value)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Place of birth"
                            fullWidth
                            size="medium"
                            error={Boolean(
                              touched.placeofbirth && errors.placeofbirth
                            )}
                            helperText={
                              touched.placeofbirth && errors.placeofbirth
                            }
                          />
                        )}
                      />

                      <Autocomplete
                        freeSolo
                        fullWidth
                        size="medium"
                        loadingText="Please wait...."
                        options={REGIONS}
                        noOptionsText="No Region available"
                        getOptionLabel={(option) => option || ''}
                        value={values.region}
                        onChange={(e, value) => setFieldValue('region', value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Region"
                            fullWidth
                            size="medium"
                            error={Boolean(touched.region && errors.region)}
                            helperText={touched.region && errors.region}
                          />
                        )}
                      />
                    </CustomFormControl>
                    <Typography
                      variant="body2"
                      color="primary.main"
                      sx={{ fontWeight: 'bold' }}
                    >
                      Party information
                    </Typography>

                    <CustomFormControl>
                      <Autocomplete
                        // freeSolo
                        fullWidth
                        size="medium"
                        loadingText="Please wait...."
                        loading={parties.isLoading}
                        options={parties.data}
                        noOptionsText="No Region available"
                        getOptionLabel={(option) => option.name || ''}
                        isOptionEqualToValue={(option, value) =>
                          value?._id === undefined ||
                          value?._id === '' ||
                          value?._id === option?._id
                        }
                        value={values.party}
                        onChange={(e, value) => setFieldValue('party', value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Party"
                            fullWidth
                            size="medium"
                            error={Boolean(
                              touched?.party?.name && errors?.party?.name
                            )}
                            helperText={
                              touched?.party?.name && errors?.party?.name
                            }
                            // InputProps={{
                            //   startAdornment: (
                            //     <InputAdornment
                            //       position="start"
                            //       {...params.InputProps.startAdornment}
                            //     >
                            //       <Avatar
                            //         variant="square"
                            //         src={values?.party?.imageURL}
                            //       />
                            //     </InputAdornment>
                            //   ),
                            // }}
                          />
                        )}
                      />
                    </CustomFormControl>
                  </Stack>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    sx={{ minWidth: { xs: 100, sm: 150 } }}
                  >
                    Cancel
                  </Button>
                  <LoadingButton
                    startIcon={<SaveAltIcon />}
                    loading={isSubmitting}
                    variant="contained"
                    color="primary"
                    sx={{ minWidth: { xs: 100, sm: 150 } }}
                    onClick={handleSubmit}
                  >
                    Save
                  </LoadingButton>
                </DialogActions>
              </AnimatedContainer>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default AddParliamentarian;
