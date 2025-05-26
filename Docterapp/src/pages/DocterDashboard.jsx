import React from "react";

const DoctorDashboard = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Registered Patients</h2>
        {/* Placeholder for now */}
        <p>No patients yet.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Schedule Appointments</h2>
        {/* Coming soon */}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Notes / Prescriptions</h2>
        {/* Coming soon */}
      </section>
    </div>
  );
};

export default DoctorDashboard;