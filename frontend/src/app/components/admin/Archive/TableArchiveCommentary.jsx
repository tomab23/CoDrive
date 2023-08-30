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

const TableArchiveCommentart = ({commentary}) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCommentaryId, setSelectedCommentaryId] = useState(null);
    const [confirmationOpen, setConfirmationOpen] = useState(false);

   

console.log(commentary);
    const handleArchiveConfirmation = (id) => {
    
    };
  
    const handleRowClick = (params) => {
      const { id } = params.row;
      setConfirmationOpen(true);
      setSelectedCommentaryId(id);
    };
  
    const handleCloseConfirmation = () => {
      setConfirmationOpen(false);
    };
    
  

    

    
      const handleCloseMenu = () => {
        setAnchorEl(null);
    
      };


    const columns = [
        { field: 'note', headerName: 'Note', flex: 0.5 },
        { field: 'datePublication', headerName: 'Date de création', flex: 0.5, renderCell: (params) => params.datePublication },
        { field: 'firstname', headerName: 'Nom', flex: 0.5, },
        { field: 'lastname', headerName: 'Prenom', flex: 0.5, },
        { field: 'text', headerName: 'Texte', flex: 4, headerAlign: "center",align: 'center' },
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

export default TableArchiveCommentart
