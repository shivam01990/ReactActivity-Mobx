import  { Fragment } from 'react';
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import { useLocation } from 'react-router-dom';

function App() {

  const location=useLocation();

  return (
      <Fragment>
      <NavBar />     
      <Container style={{marginTop:'7em'}}>   
      <Routes>     
         <Route path='/' element={<HomePage/>}></Route>         
         <Route path='/activities' element={<ActivityDashboard/>}></Route>
         <Route path='/activities/:id' element={<ActivityDetails/>}></Route>
         <Route key={location.key} path='/createActivity' element={<ActivityForm key={location.key}/>}></Route>
         <Route path='/createActivity/manage/:id' element={<ActivityForm key={location.key}/>}></Route>
         </Routes>
       </Container>
    </Fragment>
  );
}

export default observer(App);
