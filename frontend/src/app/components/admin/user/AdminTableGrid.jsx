import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import InfoIcon from '@mui/icons-material/Info';;
import apiBackEndUser from '../../../api/backend/api.BackendUser';
import clsx from 'clsx';


import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

import {
  GridRowModes,
  GridActionsCellItem,
} from '@mui/x-data-grid-pro';
import apiBackEnd from '../../../api/backend/api.Backend';
import PopUp from './PopUp';
import { useNavigate } from 'react-router-dom';
import { URL_ADMIN_DASHBOARD } from '../../../constants/urls/urlFrontEnd';
import GridCustomToolbar from './../../GridCustomToolbar';


const AdminTableGrid = ({ users }) => {

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [notes, setNotes] = useState({});
  const [addPointsOpen, setAddPointsOpen] = useState(false);

  const [openEditPopup, setOpenEditPopup] = useState(false);

  const [isShow, setIsShow] = useState(false);

  const closePopup = () => {
    setIsShow(false);
    setOpenEditPopup(false);
  };
  

 

  useEffect(() => {
    users.forEach((user) => {
      const userId = user.id;
      console.log(user.id);
      apiBackEndUser
        .get(`note/${userId}`)
        .then((res) => {
          setNotes((prevNotes) => ({
            ...prevNotes,
            [userId]: res.data,
          }));
        })
        .catch((error) => {
          console.log('Error fetching note for user with ID', userId, error);
          setNotes((prevNotes) => ({
            ...prevNotes,
            [userId]: null,
          }));
        });
    });
  }, [users]);


  const [rowModesModel, setRowModesModel] = useState({});

 

    const handleEditClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
      const user = rows.find((row) => row.id === id);
      setSelectedUserId(id);
      setOpenEditPopup(true);
    };
    


    const handleNavigateClick = (id) => () => {
      navigate(`${URL_ADMIN_DASHBOARD}?id=${id}`);
  
    };
  
  

  const handleDeleteClick = (id) => () => {
    // Mettre le delete ICI
  };



  const handleCloseMenu = () => {
    setAnchorEl(null);
  };



  const columns = [
    { field: 'nom', headerName: 'Nom', flex: 0.5, },
    { field: 'prenom', headerName: 'Prénom', flex: 0.5, },
    { field: 'role', headerName: 'Role', flex: 0.5,editable: true, },
    { field: 'mail', headerName: 'Mail', flex: 0.7,editable: true, },
    {
      field: 'note',
      headerName: 'Note',
      flex: 0.2,
      cellClassName: (params) => {
        if (params.value === null) {
          return '';
        }
    
        return clsx('moveAMountColor', {
          neutre: params.value == null,
          negative: params.value <= 2 && params.value >= 0.5 ,
        });
      },
    },
    
    { field: 'dateCreation', headerName: 'Date de création', flex: 0.5 },
    { field: 'dateOfBirth', headerName: 'Date de Naissance', flex: 0.5,editable: true, },
    { field: 'points', headerName: 'Points', flex: 0.5,editable: true, },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
          icon={<InfoIcon />}
          label="Link"
          onClick={handleNavigateClick(id)}
          color="inherit"
        />,
        ];
      },
    },
  ];

  const rows = users.map((user) => ({
    id: user.id,
    nom: user.lastname,
    role: user.role,
    prenom: user.firstname,
    mail: user.mail,
    dateOfBirth: user.dateOfBirth,
    note: notes[user.id],
    dateCreation: user.dateCreation,
    points: user.points,
  }));

  return (
    <div className='h-[400px] p-3'>
     {openEditPopup && <PopUp closePopup={closePopup} user={rows.find((row) => row.id === selectedUserId)} />}
      <DataGrid
        rows={rows}
        editMode="row"
        columns={columns}
        autoPageSize
        slots={{
          toolbar: GridCustomToolbar,
        }}
        sx={{
          '& .moveAMountColor.negative': {
            backgroundColor: '#B22222',
            fontWeight: '600',
          },
          '& .moveAMountColor.neutre': {
            backgroundColor: '#ffff',
            fontWeight: '600',
          },
        }}
        initialState={{
          filter: {
            filterModel: {
              items: [{ field: 'nom ' }],
            },
          },
          sorting: {
            sortModel: [{ field: 'dateCreation', sort: 'desc' }],
          },
        }}
      />
    </div>
  );
};

export default AdminTableGrid;
