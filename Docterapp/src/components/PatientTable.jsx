import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function exportToCSV(rows, columns) {
  const header = columns.map(col => col.headerName).join(',');
  const csvRows = rows.map(row =>
    columns.map(col => {
      if (col.field === 'photo' && row[col.field]) {
        // Export full URL for photo
        return JSON.stringify(`http://localhost:8000${row[col.field]}`);
      }
      return JSON.stringify(row[col.field] ?? '');
    }).join(',')
  );
  const csv = [header, ...csvRows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'patients.csv';
  a.click();
  window.URL.revokeObjectURL(url);
}

export default function PatientTable({ patients, onView, onDelete, onPhotoClick }) {
  const [search, setSearch] = React.useState('');

  const columns = React.useMemo(() => [
    {
      field: 'photo',
      headerName: 'Photo',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) =>
        params.value ? (
          <img
            src={`http://localhost:8000${params.value}`}
            alt="Patient"
            style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }}
            onClick={() => onPhotoClick?.(params.value)}
          />
        ) : null,
    },
    { field: 'name', headerName: 'Name', width: 160 },
    { field: 'age', headerName: 'Age', width: 80, type: 'number' },
    { field: 'phone', headerName: 'Phone', width: 140 },
    { field: 'country', headerName: 'Country', width: 120 },
    { field: 'allergies', headerName: 'Allergies', width: 160 },
    { field: 'injuries', headerName: 'Injuries', width: 160 },
    { field: 'chronicConditions', headerName: 'Chronic Conditions', width: 180 },
    { field: 'medications', headerName: 'Medications', width: 180 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 240,
      sortable: false,
      filterable: false,
      headerAlign: 'right',
      align: 'right',
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', width: '100%' }}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => onView?.(params.row)}
            startIcon={<VisibilityIcon />}
            sx={{ borderRadius: 999, textTransform: 'none', boxShadow: 'none' }}
          >
            View / Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => onDelete?.(params.row)}
            startIcon={<DeleteOutlineIcon />}
            sx={{ borderRadius: 999, textTransform: 'none', boxShadow: 'none' }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ], [onView, onDelete, onPhotoClick]);

  // DataGrid expects each row to have a unique 'id' field
  const rows = patients.map((p, idx) => ({ id: idx + 1, ...p }));

  // Filter rows by search
  const filteredRows = rows.filter(row =>
    Object.values(row).some(
      val => typeof val === 'string' && val.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <Box sx={{ 
      height: '80vh', 
      width: '100%', 
      background: '#fff', 
      borderRadius: 2, 
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
      p: 3,
      border: '1px solid #e0e0e0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        pb: 2,
        borderBottom: '2px solid #f0f0f0'
      }}>
        <TextField
          label="Search patients"
          variant="outlined"
          size="small"
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{ width: 350 }}
        />
        <Button
          variant="contained"
          color="success"
          startIcon={<DownloadIcon />}
          onClick={() => exportToCSV(filteredRows, columns.filter(col => col.field !== 'actions'))}
          sx={{ fontWeight: 600 }}
        >
          Export CSV
        </Button>
      </Box>
      <Box sx={{ height: 'calc(80vh - 120px)', width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={25}
          rowsPerPageOptions={[25, 50, 100]}
          pagination
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
          sx={{ 
            fontSize: 14,
            '& .MuiDataGrid-root': {
              border: 'none'
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #f0f0f0'
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f8f9fa',
              borderBottom: '2px solid #e0e0e0'
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#f5f5f5'
            }
          }}
        />
      </Box>
    </Box>
  );
} 