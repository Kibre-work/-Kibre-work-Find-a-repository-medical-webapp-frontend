import React from 'react';
import { Container } from 'react-bootstrap';

function TermsAndConditions() {
  return (
    <Container style={{ maxWidth: 800, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.10)', padding: 32 }}>
      <h2 className="mb-4 fw-bold" style={{ textAlign: 'center' }}>Terms and Conditions</h2>
      <h4>Agreement Between Doctor and Patient</h4>
      <ol>
        <li>
          <strong>Medical Advice Disclaimer:</strong> The information and services provided through this platform are for general informational purposes only and do not constitute medical advice, diagnosis, or treatment. Always consult your doctor for medical concerns.
        </li>
        <li>
          <strong>Doctor-Patient Relationship:</strong> A doctor-patient relationship is established only after a direct consultation and acceptance by the doctor. Registration or use of this app does not automatically create such a relationship.
        </li>
        <li>
          <strong>Confidentiality:</strong> All personal and medical information shared by the patient will be kept confidential and used only for the purpose of providing medical care, except as required by law.
        </li>
        <li>
          <strong>Patient Responsibilities:</strong> Patients agree to provide accurate, complete, and up-to-date information. Patients are responsible for following the doctor’s instructions and for their own health decisions.
        </li>
        <li>
          <strong>Doctor Responsibilities:</strong> Doctors agree to provide care to the best of their ability, maintain confidentiality, and act in accordance with professional standards and ethics.
        </li>
        <li>
          <strong>Emergency Situations:</strong> This platform is not intended for emergency medical situations. In case of emergency, patients should contact local emergency services immediately.
        </li>
        <li>
          <strong>Communication:</strong> Communication through this app may not be instant. Patients should not rely on this platform for urgent matters.
        </li>
        <li>
          <strong>Fees and Payments:</strong> Patients agree to pay all applicable fees for consultations and services as described in the app. Payment terms will be clearly communicated before any charge.
        </li>
        <li>
          <strong>Changes to Terms:</strong> The app reserves the right to update these terms at any time. Continued use of the app constitutes acceptance of the updated terms.
        </li>
        <li>
          <strong>Consent:</strong> By using this app, both doctors and patients agree to these terms and conditions.
        </li>
      </ol>
      <p style={{ marginTop: 32, fontStyle: 'italic', color: '#555' }}>
        If you have any questions about these terms, please contact support.
      </p>
    </Container>
  );
}

export default TermsAndConditions;
