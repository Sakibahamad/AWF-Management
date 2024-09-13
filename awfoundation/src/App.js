import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage1 from './Componenets/Homepage1';
import Register from './Register';
import Login from './Componenets/Login';
import Homepage2 from './Componenets/Homepage2';
import FeatureSection from './Componenets/FeatureSection';
import Bottom from './Componenets/Bottom';
import Gallary from './Componenets/Gallary';
import Read from './Componenets/Read';
import VerticalNav from './Componenets/VerticalNav'; // Import VerticalNav
import Create from './Componenets/Create';
import Update from './Componenets/Update'; // Import Update
import ExpenseTable from './Componenets/ExpenseTable';
import AddExpense from './Componenets/AddExpense';
import ExpenseUpdate from './Componenets/ExpenseUpdate';
import InventoryTable from './Componenets/InventoryTable';
import AddInventory from './Componenets/AddInventory';
import InventoryUpdate from './Componenets/InventoryUpdate';
import EmployeeTable from './Componenets/EmployeeTable';
import AddEmployee from './Componenets/AddEmployee';
import EmployeeUpdate from './Componenets/EmployeeUpdate';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <VerticalNav />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Homepage1 />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/homepage" element={<Homepage2 />} />
            <Route path="/feature" element={<FeatureSection />} />
            <Route path="/bottom" element={<Bottom />} />
            <Route path="/gallary" element={<Gallary />} />

            <Route path="/read" element={<Read />} />
            <Route path="/create" element={<Create />} />
            <Route path="/update/:id" element={<Update />} /> 

            <Route path="/expenses" element={<ExpenseTable />} />
            <Route path="/AddExpense" element={<AddExpense />} />
            <Route path="/ExpenseUpdate/:id" element={<ExpenseUpdate />} />

            <Route path="/inventory" element={<InventoryTable />} />
            <Route path="/inventory/create" element={<AddInventory />} />
            <Route path="/inventory/update/:id" element={<InventoryUpdate />} />

            <Route path="/employee" element={<EmployeeTable />} />
            <Route path="/employee/create" element={<AddEmployee />} />
            <Route path="/employee/update/:id" element={<EmployeeUpdate />} />

            <Route path="/homepage1" element={<Homepage1 />} />
            <Route path="/homepage2" element={<Homepage2 />} />
            <Route path="/sign-out" element={<Homepage1 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
