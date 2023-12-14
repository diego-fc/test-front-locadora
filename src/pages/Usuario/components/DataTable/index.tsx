import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

interface DataTableProps {
  onEditAirport: (id: number | string) => void;
  onDeleteAirport: (id: number | string) => void;
  onViewAirport: (id: number | string) => void;
  data: Usuario[];
  [x: string]: any;
}
export default function DataTable({
  onEditAirport,
  onDeleteAirport,
  onViewAirport,
  data,
}: DataTableProps) {
  const columns: GridColDef[] = [
    {
      field: "email",
      headerName: "E-mail",
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    {
      field: "nome",
      headerName: "Nome",
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    {
      field: "acesso",
      headerName: "Acesso",
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      headerClassName: 'super-app-theme--header',
      sortable: false,
      width: 160,
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            key={`edit-${row.ID_AEROPORTO}`}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => onEditAirport(row.ID_AEROPORTO)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={`delete-${row.ID_AEROPORTO}`}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => onDeleteAirport(row.ID_AEROPORTO)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={`view-${row.ID_AEROPORTO}`}
            icon={<VisibilityIcon />}
            label="View"
            onClick={() => onViewAirport(row.ID_AEROPORTO)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  return (
    <>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </>
  );
}
