import { useState } from "react";
import PatientHub from "./patient-hub-refreshed";
import LoginPage from "./LoginPage";

function App() {
  const [role, setRole] = useState(null);       // "admin" or "patient"
  const [patient, setPatient] = useState(null); // patient object from backend

  if (!role) {
    // Show login until user logs in
    return (
      <LoginPage
        onLogin={(role, patientObj) => {
          setRole(role);
          setPatient(patientObj);
        }}
      />
    );
  }

  // Once logged in, show PatientHub with backend data
  return (
    <PatientHub
      role={role}
      patient={patient}
      onLogout={() => {
        setRole(null);
        setPatient(null);
      }}
    />
  );
}

export default App;
