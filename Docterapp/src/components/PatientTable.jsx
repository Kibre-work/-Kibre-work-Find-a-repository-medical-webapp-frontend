import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DownloadIcon from '@mui/icons-material/Download';

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
      width: 160,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <Button size="small" variant="outlined" color="primary" style={{ marginRight: 8 }} onClick={() => onView?.(params.row)}>
            View / Edit
          </Button>
          <Button size="small" variant="outlined" color="error" onClick={() => onDelete?.(params.row)}>
            Delete
          </Button>
        </>
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
    <Box sx={{ height: 600, width: '100%', background: '#fff', borderRadius: 2, boxShadow: 2, p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <TextField
          label="Search patients"
          variant="outlined"
          size="small"
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{ width: 300 }}
        />
        <Button
          variant="contained"
          color="success"
          startIcon={<DownloadIcon />}
          onClick={() => exportToCSV(filteredRows, columns.filter(col => col.field !== 'actions'))}
        >
          Export CSV
        </Button>
      </Box>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        pagination
        disableSelectionOnClick
        components={{ Toolbar: GridToolbar }}
        sx={{ fontSize: 16 }}
      />
    </Box>
  );
} 