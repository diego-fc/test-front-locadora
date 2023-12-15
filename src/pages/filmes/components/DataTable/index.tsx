import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

interface DataTableProps {
  onEditFilm: (id: number) => void;
  onDeleteFilm: (id: number) => void;
  onViewFilm: (id: number) => void;
  data: Filmes[];
  [x: string]: any;
}
export default function DataTable({
  onEditFilm,
  onDeleteFilm,
  onViewFilm,
  data = [],
}: DataTableProps) {
  const columns: GridColDef[] = [
    {
      field: "titulo",
      headerName: "Titulo",
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    {
      field: "valorLocacao",
      headerName: "Valor",
      headerClassName: 'super-app-theme--header',
      flex: 1,
      renderCell: ({row}) => {
        const formatedAmount = row?.valorLocacao?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        return <div>{`${formatedAmount}`}</div>
      }
    },
    {
      field: "quantidadeDisponivel",
      headerName: "Qtd Disponivel",
      headerClassName: 'super-app-theme--header',
      flex: 1,
      renderCell: ({row}) => {
        const text = row.quantidadeDisponivel < 2 ? "Unidate" : "unidades"
        return <div>{`${row.quantidadeDisponivel} ${text}`}</div>
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
            onClick={() => onEditFilm(row.id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={`delete-${row.id}`}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => onDeleteFilm(row.id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={`view-${row.id}`}
            icon={<VisibilityIcon />}
            label="View"
            onClick={() => onViewFilm(row.id)}
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
