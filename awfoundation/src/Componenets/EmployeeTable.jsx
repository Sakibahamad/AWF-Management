import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@fluentui/react/lib/Modal';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import updateIcon from './update.png'; 
import deleteIcon from './delete.png'; 

initializeIcons();

const EmployeeTable = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const navigate = useNavigate();

    // Fetch employee data
    const fetchEmployees = async () => {
        try {
            const response = await axios.get('https://66e289c4494df9a478e20f0e.mockapi.io/Employee');
            setEmployees(response.data);
            setFilteredEmployees(response.data); // Initialize with all employees
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    // Filter employees by name or role
    useEffect(() => {
        if (searchQuery) {
            const lowercasedQuery = searchQuery.toLowerCase();
            const filtered = employees.filter(employee =>
                employee.employeeName.toLowerCase().includes(lowercasedQuery) || 
                employee.role.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredEmployees(filtered);
        } else {
            setFilteredEmployees(employees);
        }
    }, [searchQuery, employees]);

    // Sort employees by the specified column
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedEmployees = [...filteredEmployees].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setFilteredEmployees(sortedEmployees);
    };

    // Determine the sort icon to display
    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? '⬆️' : '⬇️'; // Up or down arrow
        }
        return '↕️'; // Neutral arrow
    };

    // Format Aadhar number
    const formatAadharNumber = (aadharNo) => {
        return aadharNo.replace(/(\d{4})(?=\d)/g, '$1 ');
    };

    // Navigate to Update page
    const handleUpdate = (id) => {
        navigate(`/employee/update/${id}`);
    };

    // Navigate to Homepage2
    const handleHomeClick = () => {
        navigate('/homepage2');
    };

    // Open delete modal
    const handleDeleteClick = (employee) => {
        setSelectedEmployee(employee);
        setIsDeleteModalOpen(true);
    };

    // Perform deletion
    const handleDelete = async () => {
        if (selectedEmployee) {
            try {
                await axios.delete(`https://66e289c4494df9a478e20f0e.mockapi.io/Employee/${selectedEmployee.id}`);
                setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== selectedEmployee.id));
                setFilteredEmployees(prevFiltered => prevFiltered.filter(employee => employee.id !== selectedEmployee.id));
                setIsDeleteModalOpen(false);
                setSelectedEmployee(null);
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    };

    // Close delete modal
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedEmployee(null);
    };

    // Open create modal
    const handleAddEmployee = () => {
        navigate('/employee/create1');
    };

    // Close create modal and refresh the employee list
    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
        fetchEmployees(); // Refresh the employee list after closing the Create modal
    };

    return (
        <div className="read-container">
            <h2 className="read-heading">Employee Records</h2>
            <button className="add-button" onClick={handleAddEmployee}>Add</button>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by name or role"
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <table className="record-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('employeeName')}>
                            Employee Name {getSortIcon('employeeName')}
                        </th>
                        <th onClick={() => handleSort('role')}>
                            Role {getSortIcon('role')}
                        </th>
                        <th onClick={() => handleSort('salary')}>
                            Salary {getSortIcon('salary')}
                        </th>
                        <th onClick={() => handleSort('location')}>
                            Location {getSortIcon('location')}
                        </th>
                        <th onClick={() => handleSort('aadharNo')}>
                            Aadhar No {getSortIcon('aadharNo')}
                        </th>
                        <th onClick={() => handleSort('mobileNo')}>
                            Mobile No {getSortIcon('mobileNo')}
                        </th>
                        <th onClick={() => handleSort('joiningDate')}>
                            Joining Date {getSortIcon('joiningDate')}
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.employeeName}</td>
                                <td>{employee.role}</td>
                                <td>{employee.salary}</td>
                                <td>{employee.location}</td>
                                <td>{formatAadharNumber(employee.aadharNo)}</td>
                                <td>{employee.mobileNo}</td>
                                <td>{employee.joiningDate}</td>
                                <td>
                                    <img
                                        title='Update'
                                        src={updateIcon}
                                        alt="Update"
                                        className="action-icon"
                                        onClick={() => handleUpdate(employee.id)}
                                        style={{ width: '20px', cursor: 'pointer' }}
                                    />
                                    <img
                                        title='Delete'
                                        src={deleteIcon}
                                        alt="Delete"
                                        className="action-icon"
                                        onClick={() => handleDeleteClick(employee)}
                                        style={{ width: '20px', cursor: 'pointer', marginLeft: '10px' }}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No records found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onDismiss={closeDeleteModal}
                isBlocking={false}
                containerClassName="modal-container"
            >
                <div className="modal-header">
                    <h2 className="modal-heading">Confirmation !</h2>
                </div>
                <div className="modal-body">
                    <p>Are you sure you want to delete this employee?</p>
                    <div className="modal-actions">
                        <button className="cancel-button" onClick={closeDeleteModal}>No</button>
                        <button className="confirm-button" onClick={handleDelete}>Yes</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default EmployeeTable;
