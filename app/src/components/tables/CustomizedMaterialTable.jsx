import Box from '@mui/material/Box';
import { Button, Container } from '@mui/material';
import MaterialTable, { MTableToolbar } from 'material-table';
import { Add, Delete, Refresh } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { tableIcons } from '../../config/tableIcons';
import AnimatedContainer from '../animations/AnimatedContainer';
import CustomTableTitle from '../custom/CustomTableTitle';
import EmptyDataContainer from '../EmptyDataContainer';
import Content from '../Content';

function CustomizedMaterialTable({
  title,
  subtitle,
  icon,
  exportFileName,
  isLoading,
  search,
  columns,
  data,
  options,
  actions,
  onRowClick,
  handleRefresh,
  showAddButton,
  addButtonImg,
  addButtonText,
  addButtonMessage,
  onAddButtonClicked,
}) {
  const modifiedColumns = columns.map((column) => {
    return { ...column };
  });

  return (
    <AnimatedContainer>
      <Box width="100%">
        <MaterialTable
          isLoading={isLoading}
          title={
            <CustomTableTitle title={title} subtitle={subtitle} icon={icon} />
          }
          icons={tableIcons}
          columns={modifiedColumns}
          data={data === undefined ? [] : data}
          options={{
            // selection: true,
            draggable: true,
            search: search || false,
            searchFieldVariant: 'outlined',
            exportButton: true,
            exportAllData: true,
            exportFileName: exportFileName || title || '',
            showTextRowsSelected: false,
            showSelectAllCheckbox: false,
            columnsButton: false,
            paging: !(data === undefined || data.length === 0),
            pageSize: 5,
            pageSizeOptions: [5, 10, 20, 30, 40, 50],
            paginationType: 'stepped',
            actionsColumnIndex: -1,
            overflowY: 'scroll',
            header: !(data === undefined || data.length === 0),
            headerStyle: {
              whiteSpace: 'nowrap',
            },
            rowStyle: {
              // backgroundColor: 'transparent',
            },

            ...options,
          }}
          style={{
            backgroundColor: 'tranparent',
            boxShadow: 'none',
            fontSize: 12,
          }}
          actions={[
            {
              icon: () => <Refresh className="hide-on-print" />,
              position: 'toolbar',
              tooltip: 'Refresh',
              onClick: () => handleRefresh(),
              isFreeAction: true,
            },
            {
              icon: () => <Delete className="hide-on-print" />,
              position: 'toolbarOnSelect',
              tooltip: 'Delete',
              onClick: () => alert('Delete All'),
            },
            ...actions,
          ]}
          onRowClick={(e, rowData) => onRowClick && onRowClick(rowData)}
          components={{
            Toolbar: (props) => {
              return data === undefined || data.length === 0 ? null : (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      padding: 1,
                    }}
                  >
                    {showAddButton && (
                      <Button
                        variant="contained"
                        startIcon={<Add />}
                        disableElevation
                        onClick={() => onAddButtonClicked()}
                      >
                        {addButtonText}
                      </Button>
                    )}
                  </Box>
                  <MTableToolbar {...props} />
                </>
              );
            },
          }}
          localization={{
            body: {
              emptyDataSourceMessage: (
                <EmptyDataContainer
                  img={addButtonImg}
                  message={addButtonMessage}
                  buttonText={addButtonText}
                  onClick={onAddButtonClicked}
                  showAddButton={showAddButton}
                />
              ),
            },
          }}
        />
      </Box>
    </AnimatedContainer>
  );
}
CustomizedMaterialTable.propTypes = {
  icon: PropTypes.node,
  isLoading: PropTypes.bool,
  search: PropTypes.bool,
  showAddButton: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  exportFileName: PropTypes.string,
  showImportButton: PropTypes.bool,
  importButtonText: PropTypes.string,
  addButtonMessage: PropTypes.string,
  showRowShadow: PropTypes.bool,
  addButtonImg: PropTypes.node,
  addButtonText: PropTypes.string,
  actions: PropTypes.array,
  columns: PropTypes.array,
  data: PropTypes.array,
  options: PropTypes.object,
  onRowClick: PropTypes.func,
  handleRefresh: PropTypes.func,
  onAddButtonClicked: PropTypes.func,
};

export default CustomizedMaterialTable;
