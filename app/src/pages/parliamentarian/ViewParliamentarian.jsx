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
  CheckCircle,
  DeleteRounded,
  DisabledByDefault,
  Edit,
  MessageRounded,
  PasswordRounded,
} from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import Swal from 'sweetalert2';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
import { ParliamentarianContext } from '../../context/providers/ParliamentarianProvider';
import FadeTransition from '../../components/animations/FadeTransition';
import Content from '../../components/Content';
import ProfileItem from '../../components/items/ProfileItem';
import { deleteParliamentarian, getParliamentarian } from '../../api/parliamentarianAPI';
import {
  alertError,
  alertSuccess,
} from '../../components/alerts/globalAlertActions';
import { RootContext } from '../../context/providers/RootProvider';

const ViewParliamentarian = () => {
  const queryClient = useQueryClient();
  const { palette } = useTheme();
  const { rootDispatch } = useContext(RootContext);
  const {
    parliamentarianState: {
      viewData: { open, data },
    },
    parliamentarianDispatch,
  } = useContext(ParliamentarianContext);

  const parliamentarian = useQuery({
    queryKey: ['parliamentarian'],
    queryFn: () => getParliamentarian(data?._id),
    initialData: () => {
      return data;
    },
    enabled: !!data?._id,
  });

  // View Parliamentarianial Candidate Details
  const handleEdit = () =>
    parliamentarianDispatch({
      type: 'edit-parliamentarian',
      payload: {
        open: true,
        data: parliamentarian?.data,
      },
    });

  // Close Parliamentarianial Candidate Details
  const handleClose = () =>
    parliamentarianDispatch({
      type: 'view-parliamentarian',
      payload: {
        open: false,
        // data: {},
      },
    });

  // DELETE Candiate Info

  const { mutateAsync: deleteMutate } = useMutation({
    mutationFn: deleteParliamentarian,
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
        deleteMutate(parliamentarian?.data?._id, {
          onSuccess: (message) => {
            queryClient.invalidateQueries(['parliamentarians']);
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
              srcSet={parliamentarian.data?.imageURL}
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
          <ProfileItem label="Name" text={`${parliamentarian?.data?.fullName}`} />
          <ProfileItem
            label="Date Of Birth"
            tex
            text={moment(new Date(parliamentarian?.data?.dateofbirth)).format(
              'Do MMMM, YYYY.'
            )}
          />
          <ProfileItem label="Gender" text={parliamentarian?.data?.gender} />
          <ProfileItem label="Email Address" text={parliamentarian?.data?.email} />
          <ProfileItem
            label="Telephone No."
            text={parliamentarian?.data?.phonenumber}
          />
          <ProfileItem label="Address" text={parliamentarian?.data?.address} />
          <ProfileItem
            label="Place of Birth"
            text={parliamentarian?.data?.placeofbirth}
          />
          <ProfileItem label="Region" text={parliamentarian?.data?.region} />{' '}
          <Divider flexItem textAlign="left">
            <Chip label="Party Information" color="primary" />
          </Divider>
          <ProfileItem label="Party" text={parliamentarian?.data?.party?.name} />
          <Divider flexItem textAlign="left">
            <Chip label="Account Status" color="primary" />
          </Divider>
          <ProfileItem
            label="Account"
            text={parliamentarian?.data?.active ? 'Active' : 'Disabled'}
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
              color={parliamentarian?.data?.active ? 'error' : 'primary'}
              // endIcon={
              //   parliamentarian?.data?.active ? (
              //     <DisabledByDefault />
              //   ) : (
              //     <CheckCircle />
              //   )
              // }
              // onClick={disableUserAccount}
            >
              {parliamentarian?.data?.active ? 'Disable Account' : 'Enable Account'}
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

export default ViewParliamentarian;
