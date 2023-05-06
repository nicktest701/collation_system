import { Edit } from '@mui/icons-material';
import _ from 'lodash';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  Avatar,
  Chip,
  IconButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

export const PARTY_COLUMNS = (handleEdit) => [
  {
    title: 'Flag',
    field: 'flag',
    hidden: true,
  },
  {
    field: 'imageURL',
    hidden: true,
  },

  {
    title: 'Party',
    field: 'flag',
    export: false,
    width: 700,
    searchable: true,
    render: (rowData) => (
      <Stack
        direction="row"
        columnGap={1}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Avatar
          variant="square"
          src={rowData.imageURL}
          sx={{
            width: 80,
            height: 80,
          }}
        />

        <Typography
          variant="body2"
          sx={{
            whiteSpace: 'nowrap',
            fontWeight: 'bold',
          }}
        >
          {rowData.name}
        </Typography>
      </Stack>
    ),
  },

  {
    title: 'Party Name',
    field: 'name',
    hidden: true,
  },
  {
    title: 'Party Initials',
    field: 'initials',
  },
  {
    title: 'Status',
    field: 'status',
    render: ({ active }) => (
      <Chip
        variant="outlined"
        color={active ? 'success' : 'warning'}
        label={active ? 'Active' : 'Inactive'}
        size="small"
      />
    ),
  },
  {
    title: 'Actions',
    render: (rowData) => {
      return (
        <Stack
          direction="row"
          columnGap={2}
          onClick={() => handleEdit(rowData)}
        >
          <IconButton color="primary" title="Edit">
            <MoreHorizIcon className="table-icon" />
          </IconButton>
        </Stack>
      );
    },
  },
];

export const PRESIDENT_COLUMNS = (handleEdit) => [
  {
    title: 'Candidate',
    field: 'profile',
    export: false,
    width: 500,
    render: (rowData) => (
      <Stack
        direction="row"
        columnGap={1}
        justifyContent="center"
        alignItems="center"
      >
        <Avatar
          src={rowData?.imageURL}
          sx={{
            width: 60,
            height: 60,
          }}
        />
        <ListItemText
          primary={
            <Typography
              variant="body2"
              sx={{
                whiteSpace: 'nowrap',
                fontWeight: 'bold',
              }}
            >
              {_.startCase(rowData.fullName)}
            </Typography>
          }
          secondary={
            <Typography variant="caption">{`${_.startCase(rowData.gender)} ,${
              rowData.age
            }yrs`}</Typography>
          }
        />
      </Stack>
    ),
  },
  {
    title: 'Candidate Name',
    field: 'fullName',
    hidden: true,
    export: true,
  },

  {
    title: 'Place of Birth',
    headerStyle: {
      whiteSpace: 'nowrap',
    },
    export: false,
    render: (rowData) => (
      <ListItemText
        primary={
          <Typography
            variant="body2"
            sx={{
              whiteSpace: 'nowrap',
              fontWeight: 'bold',
              color: 'primary.main',
            }}
          >
            {_.startCase(rowData.placeofbirth)}
          </Typography>
        }
        secondary={
          <Typography variant="caption" whiteSpace="nowrap">
            {rowData.region}
          </Typography>
        }
      />
    ),
  },
  {
    field: null,
    title: 'Contact Info',
    render: (rowData) => (
      <ListItemText
        primary={<Typography variant="body2">{rowData.email}</Typography>}
        secondary={
          <Typography variant="caption" color="primary" fontWeight="bold">
            {rowData.phonenumber}
          </Typography>
        }
      />
    ),
  },
  {
    title: 'Place of Birth',
    field: 'placeofbirth',
    hidden: true,
  },
  {
    title: 'Region',
    field: 'region',
    hidden: true,
  },
  {
    title: 'Date Of Birth',
    field: 'dateofbirth',
    export: true,
    hidden: true,
  },
  {
    title: 'Telephone No.',
    field: 'phonenumber',
    export: true,
    hidden: true,
  },
  {
    title: 'Email Address',
    field: 'email',
    export: true,
    hidden: true,
  },

  {
    title: 'Party',
    field: 'party.name',
  },
  {
    title: 'Status',
    field: 'status',
    render: ({ active }) => (
      <Chip
        variant="outlined"
        color={active ? 'success' : 'warning'}
        label={active ? 'Active' : 'Inactive'}
        size="small"
      />
    ),
  },
  {
    title: 'Actions',
    render: (rowData) => {
      return (
        <Stack
          direction="row"
          columnGap={2}
          onClick={() => handleEdit(rowData)}
        >
          <IconButton color="primary" title="Edit">
            <MoreHorizIcon className="table-icon" />
          </IconButton>
        </Stack>
      );
    },
  },
];
export const PARLIAMENTARIAN_COLUMNS = (handleEdit) => [
  {
    title: 'Candidate',
    field: 'profile',
    export: false,
    width: 500,
    render: (rowData) => (
      <Stack
        direction="row"
        columnGap={1}
        justifyContent="center"
        alignItems="center"
      >
        <Avatar
          src={rowData?.imageURL}
          sx={{
            width: 60,
            height: 60,
          }}
        />
        <ListItemText
          primary={
            <Typography
              variant="body2"
              sx={{
                whiteSpace: 'nowrap',
                fontWeight: 'bold',
              }}
            >
              {_.startCase(rowData.fullName)}
            </Typography>
          }
          secondary={
            <Typography variant="caption">{`${_.startCase(rowData.gender)} ,${
              rowData.age
            }yrs`}</Typography>
          }
        />
      </Stack>
    ),
  },
  {
    title: 'Candidate Name',
    field: 'fullName',
    hidden: true,
    export: true,
  },

  {
    title: 'Place of Birth',
    headerStyle: {
      whiteSpace: 'nowrap',
    },
    export: false,
    render: (rowData) => (
      <ListItemText
        primary={
          <Typography
            variant="body2"
            sx={{
              whiteSpace: 'nowrap',
              fontWeight: 'bold',
              color: 'primary.main',
            }}
          >
            {_.startCase(rowData.placeofbirth)}
          </Typography>
        }
        secondary={
          <Typography variant="caption" whiteSpace="nowrap">
            {rowData.region}
          </Typography>
        }
      />
    ),
  },
  {
    field: null,
    title: 'Contact Info',
    render: (rowData) => (
      <ListItemText
        primary={<Typography variant="body2">{rowData.email}</Typography>}
        secondary={
          <Typography variant="caption" color="primary" fontWeight="bold">
            {rowData.phonenumber}
          </Typography>
        }
      />
    ),
  },
  {
    title: 'Place of Birth',
    field: 'placeofbirth',
    hidden: true,
  },
  {
    title: 'Region',
    field: 'region',
    hidden: true,
  },
  {
    title: 'Date Of Birth',
    field: 'dateofbirth',
    export: true,
    hidden: true,
  },
  {
    title: 'Telephone No.',
    field: 'phonenumber',
    export: true,
    hidden: true,
  },
  {
    title: 'Email Address',
    field: 'email',
    export: true,
    hidden: true,
  },

  {
    title: 'Party',
    field: 'party.name',
  },
  {
    title: 'Status',
    field: 'status',
    render: ({ active }) => (
      <Chip
        variant="outlined"
        color={active ? 'success' : 'warning'}
        label={active ? 'Active' : 'Inactive'}
        size="small"
      />
    ),
  },
  {
    title: 'Actions',
    render: (rowData) => {
      return (
        <Stack
          direction="row"
          columnGap={2}
          onClick={() => handleEdit(rowData)}
        >
          <IconButton color="primary" title="Edit">
            <MoreHorizIcon className="table-icon" />
          </IconButton>
        </Stack>
      );
    },
  },
];
export const CONSTITUENCY_COLUMNS = (handleEdit) => [
  {
    title: 'ID',
    field: 'id',
    hidden: true,
  },
  {
    title: 'Code',
    field: 'code',
  },
  {
    title: 'Constituency',
    field: 'name',
    cellStyle: {
      color: '#18aa9b',
    },
  },

  {
    title: 'Region',
    field: 'region',
  },

  {
    title: 'Eligible Voters',
    field: 'voters',
  },
  {
    title: 'Status',
    field: 'status',
    render: ({ active }) => (
      <Chip
        variant="outlined"
        color={active ? 'success' : 'warning'}
        label={active ? 'Active' : 'Inactive'}
        size="small"
      />
    ),
  },
  {
    title: 'Actions',
    render: (rowData) => {
      return (
        <Stack
          direction="row"
          columnGap={2}
          onClick={() => handleEdit(rowData)}
        >
          <IconButton color="primary" title="Edit">
            <MoreHorizIcon className="table-icon" />
          </IconButton>
        </Stack>
      );
    },
  },
];
