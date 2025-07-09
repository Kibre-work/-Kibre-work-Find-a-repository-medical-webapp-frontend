import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import AboutDoctor from './pages/AboutDetails';
import GPServices from './pages/Servicess';
import ContactMe from './pages/Contact';
import Feedback from './pages/Feedback';
import BMI from './pages/BMI';
import Register from './pages/Register';
import Login from './pages/Login';
import TermsAndConditions from './pages/terms';
import ForgotPassword from './pages/ForgotPassword';
import DocterDashboard from './pages/DocterDashboard';
import PatientDashboard from './pages/PatientDashboard';
import PasswordResetConfirm from './pages/PasswordResetConfirm';
import Prescriptions from './pages/Prescriptions';
import VideoCall from './pages/VideoCall';
import VedioCall from './pages/VedioCall';
import ViewFeedback from './pages/ViewFeedback';
import AuthTest from './components/AuthTest';
import DoctorAppointments from './pages/DoctorAppointments';
import Patients from './pages/Patients';
import VedioCallProtected from './routes/VedioCallProtected';
import DownloadPrescriptions from './pages/DownloadPrescriptions';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutDoctor />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="services" element={<GPServices />} />
        <Route path="contact" element={<ContactMe />} />
        <Route path="BMI" element={<BMI />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:uid/:token" element={<PasswordResetConfirm />} />
        <Route path="dashboard" element={<DocterDashboard />} />
        <Route path="patient-dashboard" element={<PatientDashboard />} />
        <Route path="health-status" element={<PatientDashboard />} />
        <Route path="appointments" element={<PatientDashboard />} />
        <Route path="payment" element={<PatientDashboard />} />
        <Route path="terms" element={<TermsAndConditions />} />
        <Route path="prescriptions" element={<PatientDashboard />} />
        <Route path="doctor-prescriptions" element={<Prescriptions />} />
        <Route path="videocall" element={<VideoCall />} />
        <Route path="vediocall" element={<VedioCallProtected />} />
        <Route path="viewfeedback" element={<ViewFeedback />} />
        <Route path="auth-test" element={<AuthTest />} />
        <Route path="doctor-appointments" element={<DoctorAppointments />} />
        <Route path="patients" element={<Patients />} />
        <Route path="signs-symptoms" element={<Patients />} />
        <Route path="download-prescriptions" element={<DownloadPrescriptions />} />
      </Route>
    </Routes>
  );
}

export default App;