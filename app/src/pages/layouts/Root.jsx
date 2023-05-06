import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import PageNotFound from '../PageNotFound';
import Party from '../party';
import Dashboard from '../dashboard/Dashboard';
import Candidate from '../candidate';
import Result from '../result';
import Constituency from '../constituency';

function Root() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="party" element={<Party />} />
        <Route path="constituency" element={<Constituency />} />
        <Route path="candidate" element={<Candidate />} />
        <Route path="result" element={<Result />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Root;
