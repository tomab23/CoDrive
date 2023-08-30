import React, {useState, useEffect} from 'react'
import Navbar from '../../components/layouts/Navbar'
import ReturnButton from '../../components/ReturnButton'
import { useLocation } from 'react-router-dom';
import { getCommentaryByUserId } from '../../api/backend/account';
import AdminCommentaryTable from '../../components/admin/commentary/AdminCommentaryTable';

const AdminCommentaryUser = () => {

    const location = useLocation();
    const [error, setError] = useState(false);
    const [commentary, setCommentary] = useState([]);


    useEffect(() => {
        setError(false);
        getCommentaryByUserId(location.state.user.id)
          .then((commentary) => setCommentary(commentary.data))
          .catch((e) => {
            console.log(e.code);
            if (e.code === 'ERR_NETWORK') {
              setError(true);
            }
          });
      }, []);

  return (
    <div>
       <div>
      <Navbar />
      <ReturnButton className={"ml-20 mt-5"}/>
      <h4 className='mb-5 ml-20 font-bold'>commentaire(s) de {location.state.user.lastname} {location.state.user.firstname}</h4>
    </div>
    <AdminCommentaryTable commentary={commentary} isReportedTable={false}/>
    </div>
  )
}

export default AdminCommentaryUser
