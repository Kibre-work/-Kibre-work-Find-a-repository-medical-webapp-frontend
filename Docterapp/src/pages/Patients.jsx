import React, { useEffect, useState } from 'react';
import PatientTable from '../components/PatientTable';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { fetchWithAuth } from '../utils/auth';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [zoomedPhoto, setZoomedPhoto] = useState(null);

  const fetchPatients = () => {
    setLoading(true);
    fetchWithAuth('http://localhost:8000/api/patient-info/', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        // Ensure each patient has an id field
        const mapped = data.map((p, idx) => ({
          ...p,
          id: p.id || p.pk || p._id || idx + 1
        }));
        setPatients(mapped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // View patient details
  const handleView = (patient) => {
    // Ensure editForm has a valid id
    setSelectedPatient(patient);
    setEditForm({ ...patient, id: patient.id || patient.pk || patient._id });
    setEditMode(true);
  };

  // Delete patient
  const handleDelete = (patient) => {
    if (window.confirm(`Delete patient ${patient.name}?`)) {
      fetchWithAuth(`http://localhost:8000/api/patient-info/${patient.id}/`, {
        method: 'DELETE',
        credentials: 'include',
      })
        .then(res => {
          if (res.ok) fetchPatients();
        });
    }
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Save edited patient
  const handleEditSave = () => {
    setSaving(true);
    fetchWithAuth(`http://localhost:8000/api/patient-info/${editForm.id}/`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    })
      .then(async res => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.detail || 'Failed to save');
        }
        return res.json();
      })
      .then(() => {
        setSaving(false);
        setSelectedPatient(null);
        setEditMode(false);
        fetchPatients();
      })
      .catch((err) => {
        setSaving(false);
        alert(err.message);
      });
  };

  // Close modal
  const handleClose = () => {
    setSelectedPatient(null);
    setEditMode(false);
  };

  return (
    <div className="container" style={{ maxWidth: 900, margin: '2rem auto', minHeight: 800 }}>
      <h3 className="mb-4">Patients</h3>
      {loading ? (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Country</th>
              <th>Allergies</th>
              <th>Injuries</th>
              <th>Chronic Conditions</th>
              <th>Medications</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={9} style={{ textAlign: 'center' }}>Loading...</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <PatientTable
          patients={patients}
          onView={handleView}
          onDelete={handleDelete}
          onPhotoClick={photo => setZoomedPhoto(photo)}
        />
      )}
      {/* Modal for view/edit */}
      <Dialog open={!!selectedPatient} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Patient</DialogTitle>
        <DialogContent>
          {selectedPatient && editMode && (
            <form>
              <TextField margin="dense" label="Name" name="name" value={editForm.name || ''} onChange={handleEditChange} fullWidth />
              <TextField margin="dense" label="Age" name="age" value={editForm.age || ''} onChange={handleEditChange} fullWidth />
              <TextField margin="dense" label="Phone" name="phone" value={editForm.phone || ''} onChange={handleEditChange} fullWidth />
              <TextField margin="dense" label="Country" name="country" value={editForm.country || ''} onChange={handleEditChange} fullWidth />
              <TextField margin="dense" label="Allergies" name="allergies" value={editForm.allergies || ''} onChange={handleEditChange} fullWidth />
              <TextField margin="dense" label="Injuries" name="injuries" value={editForm.injuries || ''} onChange={handleEditChange} fullWidth />
              <TextField margin="dense" label="Chronic Conditions" name="chronicConditions" value={editForm.chronicConditions || ''} onChange={handleEditChange} fullWidth />
              <TextField margin="dense" label="Medications" name="medications" value={editForm.medications || ''} onChange={handleEditChange} fullWidth />
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {selectedPatient && editMode && (
            <Button onClick={handleEditSave} color="success" variant="contained" disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
      {/* Zoomed photo modal */}
      <Dialog open={!!zoomedPhoto} onClose={() => setZoomedPhoto(null)} maxWidth="sm">
        {zoomedPhoto && (
          <img
            src={`http://localhost:8000${zoomedPhoto}`}
            alt="Zoomed"
            style={{ width: '100%', maxWidth: 500, maxHeight: 500, objectFit: 'contain', display: 'block', margin: 'auto' }}
          />
        )}
      </Dialog>
    </div>
  );
};

export default Patients;