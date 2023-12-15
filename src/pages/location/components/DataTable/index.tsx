import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";

interface DataTableProps {
  onEditLocation: (id: number) => void;
  onDeleteLocation: (id: number) => void;
  onViewLocation: (id: number) => void;
  data: Locations[];
  usuarios: Usuario[];
  filmes: Filmes[];
  [x: string]: any;
}
export default function DataTable({
  onEditLocation,
  onDeleteLocation,
  onViewLocation,
  data,
  usuarios,
  filmes
}: DataTableProps) {
  const columns: GridColDef[] = [
    {
      field: "locadorId",
      headerName: "Locador",
      headerClassName: 'super-app-theme--header',
      flex: 1,
      renderCell: ({ row }) => {
        const filtered = usuarios?.find(item => {
          return item.id === row.locadorId
        })
        return <div>{`${filtered?.nome}`}</div>
      }
    },
    {
      field: "filmeId",
      headerName: "Filme",
      headerClassName: 'super-app-theme--header',
      flex: 1,
      renderCell: ({ row }) => {
        const filtered = filmes?.find(item => {
          return item.id === row.filmeId
        })
        return <div>{`${filtered?.titulo}`}</div>
      }
    },
    {
      field: "dataDevolucao",
      headerName: "Devolução",
      headerClassName: 'super-app-theme--header',
      flex: 1,
      renderCell: ({ row }) => {
        const formatDate = format(new Date(row.horaLimiteDevolucao), 'dd/MM/yyyy, p')
        return <div>{`${formatDate}`}</div>
      }
    },
    {
      field: "situacao",
      headerName: "Situação",
      headerClassName: 'super-app-theme--header',
      flex: 1,
      renderCell: ({ row }) => {
        return <div>{`${row.situacao.toUpperCase()}`}</div>
      }
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Ações",
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
            onClick={() => onEditLocation(row.id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={`delete-${row.id}`}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => onDeleteLocation(row.id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={`view-${row.id}`}
            icon={<VisibilityIcon />}
            label="View"
            onClick={() => onViewLocation(row.id)}
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
