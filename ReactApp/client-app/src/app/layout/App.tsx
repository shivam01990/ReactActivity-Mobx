import { Fragment } from 'react';
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import { useLocation } from 'react-router-dom';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';


function App() {

  const location = useLocation();

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar></ToastContainer>
      <Fragment>
        <NavBar />
        <Container style={{ marginTop: '7em' }}>
          <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/errors' element={<TestErrors />}></Route>
            <Route path='/activities' element={<ActivityDashboard />}></Route>
            <Route path='/activities/:id' element={<ActivityDetails />}></Route>
            <Route key={location.key} path='/createActivity' element={<ActivityForm key={location.key} />}></Route>
            <Route path='/createActivity/manage/:id' element={<ActivityForm key={location.key} />}></Route>
            <Route path='/server-error' element={<ServerError />}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </Container>
      </Fragment>
    </>
  );
}

export default observer(App);
