import { useContext, useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Container,
  DialogActions,
  FormLabel,
  Input,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { Formik } from 'formik';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { UploadFile } from '@mui/icons-material';
import Content from '../../components/Content';
import constituency_image from '../../assets/constituency.svg';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import { RootContext } from '../../context/providers/RootProvider';
import {
  alertError,
  alertSuccess,
} from '../../components/alerts/globalAlertActions';
import { REGIONS } from '../../config/regions';
import { CONSTITUENCIES } from '../../config/constituencies';
import {
  getAllConstituencies,
  postConstituency,
} from '../../api/constituencyAPI';
import { CONSTITUENCY_COLUMNS } from '../../components/tables/columns';

import { readXLSX } from '../../config/readXLSX';
import { readCSV } from '../../config/readCSV';
import { ConstituencyContext } from '../../context/providers/ConstituencyProvider';
import ConstituencyImportDialog from './ConstituencyImportDialog';

const CSV_FILE_TYPE = 'text/csv';
const XLSX_FILE_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const XLS_FILE_TYPE = 'application/vnd.ms-excel';

const Constituency = () => {
  const queryClient = useQueryClient();
  const { rootDispatch } = useContext(RootContext);
  const { constituencyDispatch } = useContext(ConstituencyContext);

  const [fileInputValue, setFileInputValue] = useState('');
  const [constituency, setConstituency] = useState({
    code: '',
    region: '',
    name: '',
    voters: '',
  });
  const [code, setCode] = useState('');
  const [region, setRegion] = useState('');
  const [voters, setVoters] = useState('');

  const initialValues = {
    code,
    region,
    name: constituency.name,
    voters,
  };

  const constituencies = useQuery({
    queryKey: ['constituencies'],
    queryFn: () => getAllConstituencies(),
  });

  useEffect(() => {
    if (
      constituency?.name?.trim() === '' ||
      constituency?.name?.trim() === undefined
    ) {
      setCode('');
      setRegion('');
      setVoters('');
      return;
    }

    const filteredConstittuency = CONSTITUENCIES.filter((item) => {
      return (
        item?.name
          ?.toLowerCase()
          .lastIndexOf(constituency?.name?.toLowerCase()) > -1
      );
    });
    if (!_.isEmpty(filteredConstittuency)) {
      setCode(filteredConstittuency[0].code);
      setRegion(filteredConstittuency[0].region);
      setVoters(filteredConstittuency[0].voters);
    } else {
      setCode('');
      setRegion('');
      setVoters('');
    }
  }, [constituency?.name]);

  // ADD New Constituency
  const { mutateAsync } = useMutation({
    mutationFn: postConstituency,
  });

  const onSubmit = (values, options) => {
    mutateAsync(values, {
      onSettled: () => {
        options.setSubmitting(false);
        queryClient.invalidateQueries(['constituencies']);
      },
      onSuccess: (data) => {
        rootDispatch(alertSuccess(data));
        setConstituency('');
        setCode('');
        setRegion('');
        setVoters('');
      },
      onError: (error) => {
        rootDispatch(alertError(error));
      },
    });
  };
  const handleEdit = (data) => {};

  function handleLoadFile(e) {
    const files = e.target.files[0];

    try {
      const reader = new FileReader();
      files.type === CSV_FILE_TYPE
        ? reader.readAsText(files, 'utf-8')
        : reader.readAsArrayBuffer(files);

      reader.onload = async function (event) {
        let constituencyFromFile = [];

        if (files.type === XLSX_FILE_TYPE || files.type === XLS_FILE_TYPE) {
          constituencyFromFile = readXLSX(event.target.result);
          console.log(constituencyFromFile);
        }

        if (files.type === CSV_FILE_TYPE) {
          constituencyFromFile = readCSV(event.target.result);
        }
        if (constituencyFromFile.length !== 0) {
          await constituencyDispatch({
            type: 'get-constituency-from-file',
            payload: constituencyFromFile,
          });

          await constituencyDispatch({
            type: 'open-constituency-file-dialog',
            payload: true,
          });
        }
      };
    } catch (error) {
      rootDispatch(alertError(error.message));
    }
  }

  return (
    <Box>
      <Content sx={{ bgcolor: 'primary.main' }}>
        <Typography variant="h4" color="text.plain">
          Constituency
        </Typography>
      </Content>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          paddingTop: 2,
          gap: 2,
        }}
      >
        <Content sx={{ borderLeft: '1px solid #18aa9b' }}>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize={true}
          >
            {({
              errors,
              values,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => {
              return (
                <>
                  <Stack spacing={2} paddingY={2}>
                    <Autocomplete
                      freeSolo
                      fullWidth
                      size="medium"
                      loadingText="Please wait...."
                      disableClearable
                      clearText=" "
                      options={CONSTITUENCIES}
                      noOptionsText="No Constituency available"
                      getOptionLabel={(option) => option?.name || ''}
                      isOptionEqualToValue={(option, value) =>
                        value?.code === undefined ||
                        value?.code === '' ||
                        value?.code === option?.code
                      }
                      value={constituency}
                      onChange={(e, value) => {
                        console.log(value);
                        setConstituency(value);
                        //   setFieldValue('constituency', value.name)
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Constituency"
                          fullWidth
                          size="medium"
                          error={Boolean(touched?.name && errors?.name)}
                          helperText={touched?.name && errors?.name}
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
                      value={region}
                      onChange={(e, value) => setRegion(value)}
                      renderInput={(params) => (
                        <>
                          <TextField
                            {...params}
                            label="Region"
                            fullWidth
                            size="medium"
                            error={Boolean(touched.region && errors.region)}
                            helperText={touched.region && errors.region}
                          />
                        </>
                      )}
                    />
                    <TextField
                      label="Code"
                      fullWidth
                      size="medium"
                      row={3}
                      maxRows={3}
                      value={values.code}
                      onChange={handleChange('code')}
                      error={Boolean(touched.code && errors.code)}
                      helperText={touched.code && errors.code}
                    />
                    <TextField
                      label="Number of Voters"
                      fullWidth
                      size="medium"
                      row={3}
                      maxRows={3}
                      value={values.voters}
                      onChange={handleChange('voters')}
                      error={Boolean(touched.voters && errors.voters)}
                      helperText={touched.voters && errors.voters}
                    />
                    <LoadingButton
                      loading={isSubmitting}
                      variant="contained"
                      onClick={handleSubmit}
                      startIcon={<SaveAltIcon />}
                    >
                      Add Constituency
                    </LoadingButton>
                  </Stack>
                </>
              );
            }}
          </Formik>
        </Content>

        <CustomizedMaterialTable
          title="constituencies"
          isLoading={constituencies.isLoading}
          addButtonImg={constituency_image}
          addButtonMessage="No Constituency records found"
          // showAddButton
          // onAddButtonClicked={() => setOpenAddParty(true)}
          // addButtonText="New Party"
          columns={CONSTITUENCY_COLUMNS(handleEdit)}
          data={constituencies.data}
          actions={[
            {
              icon: () => (
                <FormLabel
                  htmlFor="constituencyFile"
                  title="Import Constituency"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    padding: '12px 15px',
                    borderRadius: 1,
                    cursor: 'pointer',
                  }}
                >
                  <UploadFile />

                  <Input
                    type="file"
                    id="constituencyFile"
                    name="constituencyFile"
                    hidden={true}
                    aria-hidden={true}
                    inputProps={{
                      accept: '.xlsx,.xls,.csv',
                      hidden: true,
                    }}
                    sx={{
                      display: 'none',
                    }}
                    value={fileInputValue}
                    onChange={(event) => handleLoadFile(event)}
                    onClick={(e) => {
                      // e.target.value = null;
                      // e.currentTarget.value = null;
                      setFileInputValue('');
                    }}
                  />
                </FormLabel>
              ),

              position: 'toolbar',
              tooltip: 'Import Constituency from File',
              // onClick: (e) => {
              //   e.target.value = null;
              //   e.currentTarget.value = null;
              // },
              isFreeAction: true,
            },
          ]}
          handleRefresh={constituencies.refetch}
        />
      </Box>
      <ConstituencyImportDialog />
    </Box>
  );
};

export default Constituency;
