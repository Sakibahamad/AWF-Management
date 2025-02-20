import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Homepage1 from './Componenets/Homepage1';
import Register from './Register';
import Login from './Componenets/Login';
import Homepage2 from './Componenets/Homepage2';
import FeatureSection from './Componenets/FeatureSection';
import Bottom from './Componenets/Bottom';
import Gallary from './Componenets/Gallary';
import Read from './Componenets/Read';
import Update from './Componenets/Update';
import ExpenseTable from './Componenets/ExpenseTable';
import ExpenseUpdate from './Componenets/ExpenseUpdate';
import InventoryTable from './Componenets/InventoryTable';
import AddInventory from './Componenets/AddInventory';
import InventoryUpdate from './Componenets/InventoryUpdate';
import EmployeeTable from './Componenets/EmployeeTable';
import EmployeeUpdate from './Componenets/EmployeeUpdate';
import MonthlyDonationTable from './Componenets/MonthlyDonationTable';
import MonthlyDonationAdd from './Componenets/MonthlyDonationAdd';
import MonthlyDonationUpdate from './Componenets/MonthlyDonationUpdate';
import EventDonationTable from './Componenets/EventDonationTable';
import EventDonationAdd from './Componenets/EventDonationAdd';
import EventDonationUpdate from './Componenets/EventDonationUpdate';
import StudentAdd from './Componenets/StudentAdd';
import ExpenseAdd from './Componenets/ExpenseAdd';
import EmployeeAdd from './Componenets/EmployeeAdd';
import InkindTable from './Componenets/InkindTable';
import InkindAdd from './Componenets/InkindAdd';
import InkideUpdate from './Componenets/InkideUpdate';
import FeachureSection1 from './Componenets/FeachureSection1';
import Galary1 from './Componenets/Galary1';
import Bottom1 from './Componenets/Bottom1';
import FeatureSection2 from './Componenets/FeachureSection2';
import Bottom2 from './Componenets/Bottom2';
import Galary2 from './Componenets/Galary2';

function App() {
  const location = useLocation();

  // Check if the current path is for Homepage1
  const isHomepage1 = location.pathname === '/' || location.pathname === '/homepage1' || location.pathname === '/sign-out'|| location.pathname === '/login'
  || location.pathname === '/feature1' || location.pathname === '/bottom1' || location.pathname === '/gallary1' ;

  return (
    <div style={{ display: 'flex' }}>
      {/* Render Homepage2 unless the current route is Homepage1 */}
      {!isHomepage1 && <Homepage2 />}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Homepage1 />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homepage" element={<Read />} />
          <Route path="/feature" element={<FeatureSection />} />
          <Route path="/bottom" element={<Bottom />} />
          <Route path="/gallary" element={<Gallary />} />
          <Route path="/feature1" element={<FeachureSection1 />} />
          <Route path="/gallary1" element={<Galary1 />} />
          <Route path="/bottom1" element={<Bottom1 />} />
          <Route path="/feature2" element={<FeatureSection2 />} />
          <Route path="/bottom2" element={<Bottom2 />} />
          <Route path="/gallary2" element={<Galary2 />} />
          <Route path="/student" element={<Read />} />
          <Route path="/students/Add" element={<StudentAdd />} />
          <Route path="/student/update/:id" element={<Update />} />
          <Route path="/expenses" element={<ExpenseTable />} />
          <Route path="/AddExpense" element={<ExpenseAdd />} />
          <Route path="/ExpenseUpdate/:id" element={<ExpenseUpdate />} />
          <Route path="/inventory" element={<InventoryTable />} />
          <Route path="/inventory/create" element={<AddInventory />} />
          <Route path="/inventory/update/:id" element={<InventoryUpdate />} />
          <Route path="/employee" element={<EmployeeTable />} />
          <Route path="/employee/create1" element={<EmployeeAdd />} />
          <Route path="/employee/update/:id" element={<EmployeeUpdate />} />
          <Route path="/monthly" element={<MonthlyDonationTable />} />
          <Route path="/monthly/add" element={<MonthlyDonationAdd />} />
          <Route path="/Monthly/update/:id" element={<MonthlyDonationUpdate />} />
          <Route path="/event-yearly" element={<EventDonationTable />} />
          <Route path="/event-yearly/add" element={<EventDonationAdd />} />
          <Route path="/event-yearly/update/:id" element={<EventDonationUpdate />} />
          <Route path="/in-kind" element={<InkindTable />} />
          <Route path="/inkind/add" element={<InkindAdd />} />
          <Route path="/in-kind/update/:id" element={<InkideUpdate />} />
          <Route path="/homepage1" element={<Homepage1 />} />
          <Route path="/homepage2" element={<Homepage2 />} />
          <Route path="/sign-out" element={<Homepage1 />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
}

function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default WrappedApp;
