import React, { useEffect, useState } from 'react';
import TableTransaction from './TableTransaction';
import { getTransactionProfile, getTransactionnalById } from '../../../api/backend/account';



const Adminview = ({ admin, id }) => {

  const [transactionTrue, setTransactionTrue] = useState([]);
  const [transactionFalse, setTransactionFalse] = useState([]);


  useEffect(() => {
    {admin ? 
      getTransactionnalById(id)
      .then((transaction) => {
        const transactionFilter = transaction.data
        setTransactionTrue(transactionFilter.filter(res=> res.buy === true))
        setTransactionFalse(transactionFilter.filter(res=> res.buy === false))
      })
      .catch((e) => {
        console.log(e.code);
        if (e.code === 'ERR_NETWORK') {
          setError(true);
        }
      })
      :
      getTransactionProfile()
      .then((transaction) => {
        const transactionFilter = transaction.data
        setTransactionTrue(transactionFilter.filter(res=> res.buy === true))
        setTransactionFalse(transactionFilter.filter(res=> res.buy === false))
      })
      .catch((e) => {
        console.log(e.code);
        if (e.code === 'ERR_NETWORK') {
          setError(true);
        }
      });
    }
  }, [])


  return (
      <div className='mt-10'>
      {window.innerWidth < 1000 && (
      <p className='text-center sm:-mb-10 sm:ml-10 sm:text-sm xs:text-xs'>
        Mettez votre téléphone en paysage pour voir correctement le tableau 
      </p>
    )}
      
    <div className='flex justify-start  gap-10 pr-10 
    xl:ml-20 xl:flex-row 
    xs:-ml-2 xs:flex-col'>
      <TableTransaction transaction={transactionTrue}  title={"Obtenus"}/>
      <TableTransaction transaction={transactionFalse} title={"Perdus"} />
    </div>
    </div>
  );
};

export default Adminview;
