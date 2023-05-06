import { useContext, useEffect, useState } from 'react';

import {
  Stack,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
  FormLabel,
  Button,
  Typography,
  Autocomplete,
  MenuItem,
  Skeleton,
} from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Formik } from 'formik';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import LoadingButton from '@mui/lab/LoadingButton';
import Transition from '../../components/animations/Transition';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
import { putPresident, putPresidentProfile } from '../../api/presidentAPI';
import { RootContext } from '../../context/providers/RootProvider';
import { PresidentContext } from '../../context/providers/PresidentProvider';
import {
  alertError,
  alertSuccess,
} from '../../components/alerts/globalAlertActions';
import AnimatedContainer from '../../components/animations/AnimatedContainer';
import CustomFormControl from '../../components/inputs/CustomFormControl';
import CustomImageChooser from '../../components/inputs/CustomImageChooser';
import { REGIONS } from '../../config/regions';
import CustomDatePicker from '../../components/inputs/CustomDatePicker';
import { getAllParties } from '../../api/partyAPI';
import { TOWNS } from '../../config/towns';

const EditPresident = () => {
  const queryClient = useQueryClient();
  const { rootDispatch } = useContext(RootContext);
  const {
    presidentState: {
      editData: { open, data },
    },
    presidentDispatch,
  } = useContext(PresidentContext);

  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [profile, setProfile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [dateofbirth, setDateofbirth] = useState(null);
  const [firstname, setFirstname] = useState('');
  const [surname, setSurname] = useState('');
  const [othername, setOthername] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [placeofbirth, setPlaceofbirth] = useState('');
  const [address, setAddress] = useState('');
  const [region, setRegion] = useState('');
  const [party, setParty] = useState({
    _id: '',
    name: '',
    imageURL: '',
    initials: '',
  });

  const initialValues = {
    _id: data?._id,
    profile,
    firstname,
    surname,
    othername,
    gender,
    email,
    phonenumber,
    placeofbirth,
    address,
    region,
    party,
  };

  const parties = useQuery({
    queryKey: ['parties'],
    queryFn: () => getAllParties(),
  });

  useEffect(() => {
    setProfile(data?.profile);
    setImageURL(data?.imageURL);
    setFirstname(data.firstname);
    setSurname(data.surname);
    setOthername(data.othername);
    setDateofbirth(moment(data.dateofbirth));
    setGender(data.gender);
    setEmail(data.email);
    setPhonenumber(data.phonenumber);
    setPlaceofbirth(data.placeofbirth);
    setAddress(data.address);
    setRegion(data.region);
    setParty(data.party);
  }, [data]);

  const handleClose = () =>
    presidentDispatch({
      type: 'edit-president',
      payload: {
        open: false,
        data: {},
      },
    });

  const { mutateAsync: profileMutate } = useMutation({
    mutationFn: putPresidentProfile,
  });

  // UPDATE Candidate image
  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    if (image) {
      setIsLoadingImage(true);
      const profileInfo = {
        _id: data?._id,
        profile: image,
      };
      profileMutate(profileInfo, {
        onSettled: () => {
          queryClient.invalidateQueries(['president']);
          queryClient.invalidateQueries(['presidents']);
          setIsLoadingImage(false);
        },
        onSuccess: (message) => {
          // handleClose();
          setImageURL(URL.createObjectURL(image));
          rootDispatch(alertSuccess(message));
        },
        onError: (error) => {
          rootDispatch(alertError(error));
        },
      });
    }
  };

  // ADD New Session
  const { mutateAsync } = useMutation({
    mutationFn: putPresident,
  });

  const onSubmit = (values, options) => {
    delete values.profile;
    const partyId = values.party._id;
    values.dateofbirth = dateofbirth?.format('L');
    values.party = partyId;

    mutateAsync(values, {
      onSettled: () => {
        options.setSubmitting(false);
        queryClient.invalidateQueries(['president']);
        queryClient.invalidateQueries(['presidents']);
      },
      onSuccess: (message) => {
        handleClose();
        rootDispatch(alertSuccess(message));
      },
      onError: (error) => {
        rootDispatch(alertError(error));
      },
    });
    options.setSubmitting(false);
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="md"
      TransitionComponent={Transition}
      //   hideBackdrop
    >
      <CustomDialogTitle title="Edit Candidate Info" onClose={handleClose} />
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
              <>
                <AnimatedContainer>
                  <DialogContent>
                    <Stack padding={2} spacing={1}>
                      <Stack
                        sx={{ position: 'relative' }}
                        justifyContent="center"
                        alignItems="center"
                      >
                        {isLoadingImage ? (
                          <Skeleton
                            variant="circular"
                            width={100}
                            height={100}
                          />
                        ) : (
                          <>
                            <Avatar
                              src={imageURL}
                              sx={{
                                width: 100,
                                height: 100,
                                alignSelf: 'center',
                              }}
                            />
                            <CustomImageChooser
                              handleImageUpload={handleImageUpload}
                            />
                          </>
                        )}
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
                          value={values.firstname || ''}
                          onChange={handleChange('firstname')}
                          error={Boolean(touched.firstname && errors.firstname)}
                          helperText={touched.firstname && errors.firstname}
                          sx={{ textTransform: 'capitalize' }}
                        />
                        <TextField
                          label="Surname"
                          fullWidth
                          size="medium"
                          value={values.surname || ''}
                          onChange={handleChange('surname')}
                          error={Boolean(touched.surname && errors.surname)}
                          helperText={touched.surname && errors.surname}
                          sx={{ textTransform: 'capitalize' }}
                        />
                        <TextField
                          label="Othername"
                          fullWidth
                          size="medium"
                          value={values.othername || ''}
                          onChange={handleChange('othername')}
                          error={Boolean(touched.othername && errors.othername)}
                          helperText={touched.othername && errors.othername}
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </CustomFormControl>
                      <CustomFormControl>
                        <CustomDatePicker
                          label="Date of Birth"
                          date={dateofbirth}
                          setDate={setDateofbirth}
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
                          value={values.gender || ''}
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
                          value={values.email || ''}
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
                          value={values.phonenumber || ''}
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
                        value={values.address || ''}
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
                          value={values.placeofbirth || ''}
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
                          value={values.region || ''}
                          onChange={(e, value) =>
                            setFieldValue('region', value)
                          }
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
                          defaultValue={values.party || {}}
                          value={values.party || {}}
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
                      Save Changes
                    </LoadingButton>
                  </DialogActions>
                </AnimatedContainer>
              </>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default EditPresident;
