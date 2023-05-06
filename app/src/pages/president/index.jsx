import { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import president_empty from '../../assets/president_empty.svg';
import { getAllPresidents } from '../../api/presidentAPI';
import AddPresident from './AddPresident';
import { PRESIDENT_COLUMNS } from '../../components/tables/columns';
import { PresidentContext } from '../../context/providers/PresidentProvider';
import ViewPresident from './ViewPresident';
import EditPresident from './EditPresident';

function President() {
  const { presidentDispatch } = useContext(PresidentContext);
  const [openAddPresident, seetOpenAddPresident] = useState(false);

  const presidents = useQuery({
    queryKey: ['presidents'],
    queryFn: () => getAllPresidents(),
  });

  const updatePresidentInfo = (data) => {
    presidentDispatch({
      type: 'view-president',
      payload: {
        open: true,
        data,
      },
    });
  };

  return (
    <>
      <CustomizedMaterialTable
        title="Presidential Candidates"
        isLoading={presidents.isLoading}
        addButtonImg={president_empty}
        addButtonMessage="No Party records found"
        showAddButton
        addButtonText="New Candidate"
        onAddButtonClicked={() => seetOpenAddPresident(true)}
        columns={PRESIDENT_COLUMNS(updatePresidentInfo)}
        data={presidents.data}
        actions={[]}
      />
      <ViewPresident />
      <AddPresident open={openAddPresident} setOpen={seetOpenAddPresident} />
      <EditPresident />
    </>
  );
}

export default President;
