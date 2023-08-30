import React, {useState, useEffect, useCallback} from 'react'
import AdminTableGrid from './AdminTableGrid'
import { getUsers } from '../../../api/backend/account';
import apiBackEndUser from '../../../api/backend/api.BackendUser';
import TitleAdmin from '../TitleAdmin';


const AdminUser = () => {


  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false)

  // const [note, setNote] = useState(null)


  useEffect(() => {
    setError(false)
   getUsers()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((e) => {
        console.log(e.code)
        if (e.code === "ERR_NETWORK") {
          setError(true);
        }
      });
  }, []);

  // useEffect(() => {
  //   apiBackEndUser.get(`note/${users.id}`)
  //   .then((res) => {  
  //     console.log("res", res);
  //     setNote(res.data)
  //   })
  // }, [users])
  


  return (
    <div className='text-center'>
      <TitleAdmin title={"Utilisateurs"} />
      <AdminTableGrid users={users} />
    </div>
  )
}

export default AdminUser