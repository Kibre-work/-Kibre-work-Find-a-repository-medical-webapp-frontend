import React, { useEffect, useState } from "react";
import { fetchWithAuth } from '../utils/auth';
import { Modal, Button, Card } from 'react-bootstrap';
import { FaPills, FaCalendarAlt, FaUser, FaUserMd, FaFileAlt, FaPrint, FaTimes } from 'react-icons/fa';

const DownloadPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const userEmail = sessionStorage.getItem('email');
    if (!userEmail) {
      setLoading(false);
      return;
    }

    fetchWithAuth(`http://localhost:8000/api/prescriptions?patient_email=${userEmail}`, {credentials: 'include'})
      .then(res => res.json())
      .then(data => {
        console.log('Prescription data received:', data);
        setPrescriptions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleViewDetails = (prescription) => {
    setSelectedPrescription(prescription);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPrescription(null);
  };

  const handlePrint = () => {
    if (!selectedPrescription) return;
    
    const printWindow = window.open('', '_blank');
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Prescription #${selectedPrescription.id}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
            .field { margin: 15px 0; }
            .label { font-weight: bold; color: #333; }
            .value { margin-left: 10px; }
            .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
            @media print { body { margin: 20px; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Medical Prescription</h1>
            <p>Prescription #${selectedPrescription.id}</p>
          </div>
          
          <div class="field">
            <span class="label">Medication:</span>
            <span class="value">${selectedPrescription.medication}</span>
          </div>
          
          <div class="field">
            <span class="label">Dosage:</span>
            <span class="value">${selectedPrescription.dosage}</span>
          </div>
          
          <div class="field">
            <span class="label">Instructions:</span>
            <span class="value">${selectedPrescription.instructions}</span>
          </div>
          
          <div class="field">
            <span class="label">Prescribed Date:</span>
            <span class="value">${new Date(selectedPrescription.created_at).toLocaleDateString()}</span>
          </div>
          
          <div class="field">
            <span class="label">Patient ID:</span>
            <span class="value">${selectedPrescription.patient}</span>
          </div>
          
          <div class="field">
            <span class="label">Doctor ID:</span>
            <span class="value">${selectedPrescription.doctor}</span>
          </div>
          
          <div class="footer">
            <p>This prescription was generated on ${new Date().toLocaleDateString()}</p>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="container" style={{ maxWidth: 600, margin: "2rem auto", minHeight: 400 }}>
      <h4 className="mb-3">View Prescriptions</h4>
      {loading ? (
        <div>Loading...</div>
      ) : prescriptions.length === 0 ? (
        <div>No prescriptions available.</div>
      ) : (
        <ul className="list-group">
          {prescriptions.map((presc) => (
            <li
              key={presc.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>Prescription #{presc.id} - {presc.medication}</span>
              <button
                onClick={() => handleViewDetails(presc)}
                className="btn btn-primary btn-sm"
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Professional Prescription Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
          <Modal.Title style={{ color: '#495057', fontWeight: '600' }}>
            <FaFileAlt className="me-2" />
            Prescription Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '2rem' }}>
          {selectedPrescription && (
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <div className="row">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-3">
                      <FaPills className="me-3" style={{ color: '#28a745', fontSize: '1.2rem' }} />
                      <div>
                        <small className="text-muted">Medication</small>
                        <div className="fw-bold">{selectedPrescription.medication}</div>
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center mb-3">
                      <FaPills className="me-3" style={{ color: '#ffc107', fontSize: '1.2rem' }} />
                      <div>
                        <small className="text-muted">Dosage</small>
                        <div className="fw-bold">{selectedPrescription.dosage}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-3">
                      <FaCalendarAlt className="me-3" style={{ color: '#dc3545', fontSize: '1.2rem' }} />
                      <div>
                        <small className="text-muted">Prescribed Date</small>
                        <div className="fw-bold">{new Date(selectedPrescription.created_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center mb-3">
                      <FaUser className="me-3" style={{ color: '#6f42c1', fontSize: '1.2rem' }} />
                      <div>
                        <small className="text-muted">Patient</small>
                        <div className="fw-bold">{selectedPrescription.patient_name}</div>
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center mb-3">
                      <FaUserMd className="me-3" style={{ color: '#fd7e14', fontSize: '1.2rem' }} />
                      <div>
                        <small className="text-muted">Doctor</small>
                        <div className="fw-bold">{selectedPrescription.doctor_name}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="d-flex align-items-start">
                    <FaFileAlt className="me-3 mt-1" style={{ color: '#20c997', fontSize: '1.2rem' }} />
                    <div>
                      <small className="text-muted">Instructions</small>
                      <div className="fw-bold" style={{ lineHeight: '1.6' }}>{selectedPrescription.instructions}</div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#f8f9fa', borderTop: '2px solid #dee2e6' }}>
          <Button variant="outline-secondary" onClick={handleCloseModal}>
            <FaTimes className="me-2" />
            Close
          </Button>
          <Button variant="primary" onClick={handlePrint}>
            <FaPrint className="me-2" />
            Print as PDF
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DownloadPrescriptions; 