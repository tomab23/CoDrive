import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import apiBackEndUser from '../../api/backend/api.BackendUser';
import ProfileAdmin from '../../components/DashBoardAdmin/ProfileAdmin';
import Adminview from '../../components/admin/Transaction/Adminview';
import Navbar from '../../components/layouts/Navbar';
import ReturnButton from '../../components/ReturnButton';


const AdminDashboardUser = () => {
  const [user, setUser] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  useEffect(() => {
    apiBackEndUser.get(`/find/${id}`).then((res) => {
      setUser(res.data);
    });
  }, [id]);

  console.log(user);

  return (
    <div>
      <Navbar />
      <div className='mt-5'>
      <ReturnButton className={"xl:ml-20 xs:ml-2"}/>
      </div>
      <h4 className=' xl:ml-20  xs:ml-2 font-bold'>DASHBOARD - <span className='bg-primary p-1'>{user.firstname} {user.lastname}</span></h4>
       <button className=' xl:ml-20  xs:ml-2 mt-5 bg-secondary p-2 rounded-lg'>ENVOYER UN MESSAGE</button>
      <ProfileAdmin user={user} id={id}/>
      <Adminview admin={true} id={id}/>
      <div className='h-10 mt-10'></div>
    </div>
  );
};

export default AdminDashboardUser;
