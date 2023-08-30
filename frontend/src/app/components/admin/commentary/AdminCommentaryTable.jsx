import React,{useEffect, useState} from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ReportIcon from '@mui/icons-material/Report';


import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import ArchiveIcon from '@mui/icons-material/Archive';

import apiBackEndAdmin from '../../../api/backend/apiBackendAdmin';

import DeleteIcon from '@mui/icons-material/DeleteForever';
import GridCustomToolbar from '../../GridCustomToolbar';

const AdminCommentaryTable = ({commentary,setCommentary, isReportedTable}) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCommentaryId, setSelectedCommentaryId] = useState(null);
    const [confirmationOpen, setConfirmationOpen] = useState(false);

   

    const deleteCommentary = (id) => {
       apiBackEndAdmin.delete(`/delete/${id}`)
          handleCloseMenu(false);
          setCommentary(commentary.filter((commentary) => commentary.id !== id));
      
    };
console.log(commentary);
    const handleArchiveConfirmation = (id) => {
      setConfirmationOpen(false);
      const { text, note, datePublication, info, user, anonymous} = commentary.find((c) => c.id === id);
      const archiveData = {
        text,
        note,
        datePublication,
        infoId: info.id,
        userId: user.id,
        anonymous,
        lastname: user.lastname,
        firstname: user.firstname,
      };
  
      apiBackEndAdmin
        .post('', archiveData)
        .then((response) => {
          console.log("C'est dans la base de données", response);
          deleteCommentary(id);
        })
        .catch((error) => {
          console.log(error);
        });
        apiBackEndAdmin.delete(`/delete/${id}`)
                     .then(deleteResponse => {
                      console.log("Commentaire supprimée avec succès", deleteResponse);
                      
                    })
                    .catch(deleteError => {
                       console.log("Erreur lors de la suppression du Commentaire", deleteError);
                      
                     });
    };
  
    const handleRowClick = (params) => {
      const { id } = params.row;
      setConfirmationOpen(true);
      setSelectedCommentaryId(id);
    };
  
    const handleCloseConfirmation = () => {
      setConfirmationOpen(false);
    };
    
  

    const commentaryReport = (id) => {
      apiBackEndAdmin.put(`/commentary/${id}`)
          handleCloseMenu(false);
          setCommentary(commentary.filter((commentary) => commentary.id !== id));
      
    };

    

    
      const handleCloseMenu = () => {
        setAnchorEl(null);
    
      };


    const columns = [
        { field: 'note', headerName: 'Note', flex: 0.5 },
        { field: 'datePublication', headerName: 'Date de création', flex: 0.5, renderCell: (params) => params.row.user.datePublication },
        { field: 'firstname', headerName: 'Nom', flex: 0.5, valueGetter: (params) => params.row.user.firstname },
        { field: 'lastname', headerName: 'Prenom', flex: 0.5, valueGetter: (params) => params.row.user.lastname },
        { field: 'text', headerName: 'Texte', flex: 3, headerAlign: "center",align: 'center' },
        { field: 'report', headerName: 'Signalement', flex: 0.5, renderCell: (params) => params.row.report ? 'Oui' : 'Non' },
        {field: 'numberReport', headerName: 'nombre', flex: 0.5},
        {
          
          field: 'actions',
          headerName: 'Actions',
          type: 'actions',
          sortable: false,
          flex: 0.5, 
          renderCell: (params) => {
                 return (
                     <div style={{ cursor: "pointer" }}>
                      {/* handleRowClick(params) */}
                      {/* deleteCommentary(params.row.id) */}
                      <ArchiveIcon sx={{color: '#1e272e'} } onClick={() => handleRowClick(params)}/>
                      {isReportedTable && <ReportIcon sx={{ color: '#FF0000' }}   onClick={() => commentaryReport(params.row.id)}/>}
                       {/* color: #b33939 ou #b33939 */}
                      </div>
                 )
                }
        },
      ];
  return (
    <div  className='h-[400px] p-3'>
       <DataGrid rows={commentary} columns={columns} autoPageSize
       slots={{
        toolbar: GridCustomToolbar,
      }}
                    initialState = {{
                      filter: {
                        filterModel: {
                          items: [{ field: 'datePublication' }],
                        },
                      },
                      
                      sorting: {
                        sortModel: [{ field: 'datePublication', sort: 'desc' }],
                      },
                    }}
                    sx={{
                      '& .moveAMountColor.negative': {
                        backgroundColor: '#B22222',
                        fontWeight: '600',
                      },
                    }}
                    />

  <Dialog open={confirmationOpen} onClose={handleCloseConfirmation}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <p>Voulez vous archivez le commentaire ?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation}>Non</Button>
          <Button onClick={() => handleArchiveConfirmation(selectedCommentaryId)} color="primary">
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AdminCommentaryTable
