import { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import parliamentarian_empty from '../../assets/president_empty.svg';
import { getAllParliamentarians } from '../../api/parliamentarianAPI';
import AddParliamentarian from './AddParliamentarian';
import { PARLIAMENTARIAN_COLUMNS } from '../../components/tables/columns';
import { ParliamentarianContext } from '../../context/providers/ParliamentarianProvider';
import ViewParliamentarian from './ViewParliamentarian';
import EditParliamentarian from './EditParliamentarian';

function Parliamentarian() {
  const { parliamentarianDispatch } = useContext(ParliamentarianContext);
  const [openAddParliamentarian, seetOpenAddParliamentarian] = useState(false);

  const parliamentarians = useQuery({
    queryKey: ['parliamentarians'],
    queryFn: () => getAllParliamentarians(),
  });

  const updateParliamentarianInfo = (data) => {
    parliamentarianDispatch({
      type: 'view-parliamentarian',
      payload: {
        open: true,
        data,
      },
    });
  };

  return (
    <>
      <CustomizedMaterialTable
        title="Aspiring Members of Parliament"
        isLoading={parliamentarians.isLoading}
        addButtonImg={parliamentarian_empty}
        addButtonMessage="No Party records found"
        showAddButton
        addButtonText="New Candidate"
        onAddButtonClicked={() => seetOpenAddParliamentarian(true)}
        columns={PARLIAMENTARIAN_COLUMNS(updateParliamentarianInfo)}
        data={parliamentarians.data}
        actions={[]}
      />
      <ViewParliamentarian />
      <AddParliamentarian
        open={openAddParliamentarian}
        setOpen={seetOpenAddParliamentarian}
      />
      <EditParliamentarian />
    </>
  );
}

export default Parliamentarian;
