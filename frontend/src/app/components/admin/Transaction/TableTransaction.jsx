import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DateDetail } from "../../../helpers/DateDetail";
import GridCustomToolbar from "../../GridCustomToolbar";

const TableTransaction = ({ transaction, title }) => {
  const columns = [
    {
      field: "transactionalDate",
      headerName: "Date de la transaction",
      flex: 0.5,
      renderCell: (params) => DateDetail(params.row.transactionalDate) 
    },
    { field: "description", headerName: "Description", flex: 0.8 },
    { field: "credits", headerName: "Credits", flex: 0.5 },
    { field: "payement", headerName: "Euros", flex: 0.5, renderCell: (params) => params.row.payement + '€' },
  ];

  return (
    <div className="h-[400px] w-[800px] p-3">
      <h3 className="mb-2 font-bold">{title}</h3>
      <DataGrid
        rows={transaction}
        columns={columns}
        autoPageSize
        slots={{
          toolbar: GridCustomToolbar,
        }}
        // initialState={{
        //   sorting: {
        //     sortModel: [{ field: "id", sort: "desc" }],
        //   },
        // }}
        style={{backgroundColor: "rgb(229 231 235)"}}
      />
    </div>
  );
};

export default TableTransaction;
