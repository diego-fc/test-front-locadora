import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

interface DataTableProps {
  onEditUsuario: (id: number) => void;
  onDeleteUsuario: (id: number) => void;
  onViewUsuario: (id: number) => void;
  data: Usuario[];
  [x: string]: any;
}
export default function DataTable({
  onEditUsuario,
  onDeleteUsuario,
  onViewUsuario,
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
            key={`edit-${row.id}`}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => onEditUsuario(row.id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={`delete-${row.id}`}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => onDeleteUsuario(row.id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={`view-${row.id}`}
            icon={<VisibilityIcon />}
            label="View"
            onClick={() => onViewUsuario(row.id)}
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
