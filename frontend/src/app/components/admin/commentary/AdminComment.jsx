import React, { useEffect, useState } from 'react';
import AdminCommentaryTable from './AdminCommentaryTable';
import { getCommentarReported, getCommentary } from '../../../api/backend/account';
import Button from '../../Custom/Button';
import Test from '../testKm/TravelTestKmHour';
import TitleAdmin from '../TitleAdmin';



const AdminComment = () => {

  const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

  const [commentary, setCommentary] = useState([]);
  const [error, setError] = useState(false);
  const [commentaryReported, setCommentaryReported] = useState([]);
  const [showCommentary, setShowCommentary] = useState(true);
  const [showCommentaryReported, setShowCommentaryReported] = useState(false);

  const [comClick, setComClick] = useState(true);
  const [reportClick, setReportClick] = useState(false);

  useEffect(() => {
    setError(false);
    getCommentarReported()
      .then((commentary) => setCommentaryReported(commentary.data))
      .catch((e) => {
        console.log(e.code);
        if (e.code === 'ERR_NETWORK') {
          setError(true);
        }
      });
  }, []);

  useEffect(() => {
    setError(false);
    getCommentary()
      .then((commentary) => setCommentary(commentary.data))
      .catch((e) => {
        console.log(e.code);
        if (e.code === 'ERR_NETWORK') {
          setError(true);
        }
      });
  }, []);

  const handleCommentaryClick = () => {
    setReportClick(false);
    setComClick(true);
    setShowCommentary(true);
    setShowCommentaryReported(false);
  };
console.log(commentary);
  const handleCommentaryReportedClick = () => {
    setReportClick(true);
    setComClick(false);
    setShowCommentary(false);
    setShowCommentaryReported(true);
  };

  return (
    <div>
      <TitleAdmin title={"Commentaires"} />
      <Button type="submit" label="Tout les commentaires" className={comClick ? "bg-secondary m-5" : "bg-gray-200 m-5"} onClick={handleCommentaryClick} />
      <Button type="submit" label="Commentaires reportés"
      className={`mb-4 mt-2 xs:ml-5 ${reportClick ? 'bg-secondary' : 'bg-gray-200'}`}
      onClick={handleCommentaryReportedClick} />

      
{window.innerWidth < 1000 && (
      <p style={{ textAlign: "center", margin: "10px", fontSize: "16px" }}>
        Mettez votre téléphone en paysage pour voir correctement le tableau 
      </p>
    )}


      {showCommentary && <AdminCommentaryTable commentary={commentary} setCommentary={setCommentary} isReportedTable={false} />}
{showCommentaryReported && (
  <AdminCommentaryTable commentary={commentaryReported} setCommentary={setCommentaryReported} isReportedTable={true} />
)}

    </div>
  );
};

export default AdminComment;
