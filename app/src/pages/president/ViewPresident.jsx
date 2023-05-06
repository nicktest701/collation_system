import { useContext } from 'react';
import {
  Stack,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Box,
  Avatar,
  Chip,
  Container,
  useTheme,
} from '@mui/material';
import {

  Edit,
  MessageRounded,

} from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import Swal from 'sweetalert2';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
import { PresidentContext } from '../../context/providers/PresidentProvider';
import FadeTransition from '../../components/animations/FadeTransition';
import Content from '../../components/Content';
import ProfileItem from '../../components/items/ProfileItem';
import { deletePresident, getPresident } from '../../api/presidentAPI';
import {
  alertError,
  alertSuccess,
} from '../../components/alerts/globalAlertActions';
import { RootContext } from '../../context/providers/RootProvider';

const ViewPresident = () => {
  const queryClient = useQueryClient();
  const { palette } = useTheme();
  const { rootDispatch } = useContext(RootContext);
  const {
    presidentState: {
      viewData: { open, data },
    },
    presidentDispatch,
  } = useContext(PresidentContext);

  const president = useQuery({
    queryKey: ['president'],
    queryFn: () => getPresident(data?._id),
    initialData: () => {
      return data;
    },
    enabled: !!data?._id,
  });

  // View Presidential Candidate Details
  const handleEdit = () =>
    presidentDispatch({
      type: 'edit-president',
      payload: {
        open: true,
        data: president?.data,
      },
    });

  // Close Presidential Candidate Details
  const handleClose = () =>
    presidentDispatch({
      type: 'view-president',
      payload: {
        open: false,
        // data: {},
      },
    });

  // DELETE Candiate Info

  const { mutateAsync: deleteMutate } = useMutation({
    mutationFn: deletePresident,
  });

  const handleDelete = () => {
    Swal.fire({
      title: 'Deleting Candidate',
      text: 'Do you want to delete?',
      confirmButtonColor: palette.primary.main,
      showCancelButton: true,
      // backdrop:false
    }).then(({ isConfirmed }) => {

      if (isConfirmed) {

        deleteMutate(president?.data?._id, {
          onSuccess: (message) => {
            queryClient.invalidateQueries(['presidents']);
            rootDispatch(alertSuccess(message));
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
    <Dialog
      open={open}
      maxWidth="lg"
      fullWidth
      fullScreen
      TransitionComponent={FadeTransition}
      //   hideBackdrop
    >
      <CustomDialogTitle title="" />
      <DialogContent>
        <Content sx={{ padding: 1 }}>
          <Stack>
            <Typography variant="h3">Candidate Information</Typography>
            <Typography variant="body2" paragraph>
              Lorem ipsum dolor sit amet consectetur adipiscing elit
            </Typography>
          </Stack>
          <Divider />
        </Content>
        <Stack
          spacing={2}
          direction="row"
          alignItems="flex-end"
          justifyContent="flex-end"
        >
          <Button startIcon={<Edit />} variant="outlined" onClick={handleEdit}>
            Edit
          </Button>
          {/* <Button variant="outlined" color="error" onClick={handleEdit}>
            Delete
          </Button> */}
        </Stack>
        <Container
          maxWidth="md"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            // alignItems: 'center',
            rowGap: '4px',
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
            // boxShadow="0px 0px 13px 0px rgba(82, 63, 105, 0.05)"
            // backgroundColor="primary.main"
            borderRadius={2}
            paddingY={1}
            marginY={2}
            gap={1}
          >
            <Avatar
              srcSet={president.data?.imageURL}
              sx={{ width: 80, height: 80 }}
            />
            <Button
              size="small"
              startIcon={<MessageRounded />}
              // onClick={openQuickMessage}
            >
              Send Message
            </Button>
          </Box>
          <Divider flexItem textAlign="left">
            <Chip label="Personal Information" color="primary" />
          </Divider>
          <ProfileItem label="Name" text={`${president?.data?.fullName}`} />
          <ProfileItem
            label="Date Of Birth"
            tex
            text={moment(new Date(president?.data?.dateofbirth)).format(
              'Do MMMM, YYYY.'
            )}
          />
          <ProfileItem label="Gender" text={president?.data?.gender} />
          <ProfileItem label="Email Address" text={president?.data?.email} />
          <ProfileItem
            label="Telephone No."
            text={president?.data?.phonenumber}
          />
          <ProfileItem label="Address" text={president?.data?.address} />
          <ProfileItem
            label="Place of Birth"
            text={president?.data?.placeofbirth}
          />
          <ProfileItem label="Region" text={president?.data?.region} />{' '}
          <Divider flexItem textAlign="left">
            <Chip label="Party Information" color="primary" />
          </Divider>
          <ProfileItem label="Party" text={president?.data?.party?.name} />
          <Divider flexItem textAlign="left">
            <Chip label="Account Status" color="primary" />
          </Divider>
          <ProfileItem
            label="Account"
            text={president?.data?.active ? 'Active' : 'Disabled'}
          />
          <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
            justifyContent="flex-end"
          >
            <Button
              size="small"
              variant="outlined"
              color={president?.data?.active ? 'error' : 'primary'}
              // endIcon={
              //   president?.data?.active ? (
              //     <DisabledByDefault />
              //   ) : (
              //     <CheckCircle />
              //   )
              // }
              // onClick={disableUserAccount}
            >
              {president?.data?.active ? 'Disable Account' : 'Enable Account'}
            </Button>
            <Button
              color="error"
              size="small"
              variant="outlined"
              // endIcon={<DeleteRounded />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Stack>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewPresident;
