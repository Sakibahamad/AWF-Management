import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '@fluentui/react/lib/Modal';
import { Label } from '@fluentui/react/lib/Label';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import './EmployeeUpdate.css';

initializeIcons();

const EmployeeUpdate = () => {
    const { id } = useParams(); // Get the employee ID from the URL parameters
    const [employeeName, setEmployeeName] = useState('');
    const [role, setRole] = useState('');
    const [salary, setSalary] = useState('');
    const [location, setLocation] = useState('');
    const [aadharNo, setAadharNo] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [joiningDate, setJoiningDate] = useState('');
    
    const [employeeNameError, setEmployeeNameError] = useState('');
    const [roleError, setRoleError] = useState('');
    const [salaryError, setSalaryError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [aadharNoError, setAadharNoError] = useState('');
    const [mobileNoError, setMobileNoError] = useState('');
    const [joiningDateError, setJoiningDateError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch employee data when the component mounts
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get(`https://66e289c4494df9a478e20f0e.mockapi.io/Employee/${id}`);
                const data = response.data;
                setEmployeeName(data.employeeName);
                setRole(data.role);
                setSalary(data.salary);
                setLocation(data.location);
                setAadharNo(data.aadharNo);
                setMobileNo(data.mobileNo);
                setJoiningDate(data.joiningDate);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployeeData();
    }, [id]);

    const handleChange = (setter, errorSetter, validateFn) => (e) => {
        const value = e.target.value;
        setter(value);
        if (validateFn) {
            const errorMessage = validateFn(value);
            errorSetter(errorMessage);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.put(`https://66e289c4494df9a478e20f0e.mockapi.io/Employee/${id}`, {
                employeeName,
                role,
                salary,
                location,
                aadharNo,
                mobileNo,
                joiningDate,
            });

            console.log('Employee data updated successfully:', response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error updating employee data:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate('/employee'); // Navigate to the EmployeeTable component after update
    };

    const handleCancel = () => {
        navigate('/employee'); // Navigate to the EmployeeTable component without updating
    };

    const roleOptions = [
        { value: 'Founder', label: 'Founder' },
        { value: 'Administrator', label: 'Administrator' },
        { value: 'Workers', label: 'Workers' },
        { value: 'Consultant', label: 'Consultant' },
        { value: 'Care Taker', label: 'Care Taker' }
    ];

    const validateAadharNo = (value) => {
        const aadharRegex = /^\d{4}\s\d{4}\s\d{4}$/;
        if (value.trim() === '') {
            return 'Aadhar No field is required.';
        } else if (!aadharRegex.test(value)) {
            return 'Aadhar No must be in the format xxxx xxxx xxxx and be exactly 12 digits long.';
        } else {
            return '';
        }
    };

    const validateForm = () => {
        let isValid = true;

        if (employeeName.trim() === '') {
            setEmployeeNameError('Employee Name field is required.');
            isValid = false;
        } else {
            setEmployeeNameError('');
        }

        if (role.trim() === '') {
            setRoleError('Role field is required.');
            isValid = false;
        } else {
            setRoleError('');
        }

        if (salary.trim() === '' || isNaN(salary)) {
            setSalaryError('Salary must be a number and is required.');
            isValid = false;
        } else {
            setSalaryError('');
        }

        if (location.trim() === '') {
            setLocationError('Location field is required.');
            isValid = false;
        } else {
            setLocationError('');
        }

        const aadharError = validateAadharNo(aadharNo);
        if (aadharError) {
            setAadharNoError(aadharError);
            isValid = false;
        } else {
            setAadharNoError('');
        }

        if (mobileNo.trim() === '' || isNaN(mobileNo)) {
            setMobileNoError('Mobile No must be a number and is required.');
            isValid = false;
        } else {
            setMobileNoError('');
        }

        if (joiningDate.trim() === '') {
            setJoiningDateError('Joining Date field is required.');
            isValid = false;
        } else {
            setJoiningDateError('');
        }

        return isValid;
    };

    return (
        <div className="update-employee-container">
            <div className="update-employee-form-wrapper">
                <h2 className="update-employee-heading">Update Employee Data</h2>
                <form onSubmit={handleSubmit}>
                    <div className="update-employee-form-group">
                        <Label className="update-employee-label">Employee Name</Label>
                        <input
                            type="text"
                            className={`update-employee-input ${employeeNameError ? 'input-error' : ''}`}
                            value={employeeName}
                            onChange={handleChange(setEmployeeName, setEmployeeNameError)}
                        />
                        {employeeNameError && (
                            <div className="error-message">
                                {employeeNameError}
                            </div>
                        )}
                    </div>
                    <div className="update-employee-form-group">
                        <Label className="update-employee-label">Role</Label>
                        <select
                            className={`update-employee-select ${roleError ? 'input-error' : ''}`}
                            value={role}
                            onChange={handleChange(setRole, setRoleError)}
                        >
                            <option value="">Select Role</option>
                            {roleOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {roleError && (
                            <div className="error-message">
                                {roleError}
                            </div>
                        )}
                    </div>
                    <div className="update-employee-form-group">
                        <Label className="update-employee-label">Salary</Label>
                        <input
                            type="number"
                            className={`update-employee-input ${salaryError ? 'input-error' : ''}`}
                            value={salary}
                            onChange={handleChange(setSalary, setSalaryError)}
                        />
                        {salaryError && (
                            <div className="error-message">
                                {salaryError}
                            </div>
                        )}
                    </div>
                    <div className="update-employee-form-group">
                        <Label className="update-employee-label">Location</Label>
                        <input
                            type="text"
                            className={`update-employee-input ${locationError ? 'input-error' : ''}`}
                            value={location}
                            onChange={handleChange(setLocation, setLocationError)}
                        />
                        {locationError && (
                            <div className="error-message">
                                {locationError}
                            </div>
                        )}
                    </div>
                    <div className="update-employee-form-group">
                        <Label className="update-employee-label">Aadhar No</Label>
                        <input
                            type="text"
                            className={`update-employee-input ${aadharNoError ? 'input-error' : ''}`}
                            value={aadharNo}
                            onChange={handleChange(setAadharNo, setAadharNoError, validateAadharNo)}
                        />
                        {aadharNoError && (
                            <div className="error-message">
                                {aadharNoError}
                            </div>
                        )}
                    </div>
                    <div className="update-employee-form-group">
                        <Label className="update-employee-label">Mobile No</Label>
                        <input
                            type="text"
                            className={`update-employee-input ${mobileNoError ? 'input-error' : ''}`}
                            value={mobileNo}
                            onChange={handleChange(setMobileNo, setMobileNoError)}
                        />
                        {mobileNoError && (
                            <div className="error-message">
                                {mobileNoError}
                            </div>
                        )}
                    </div>
                    <div className="update-employee-form-group">
                        <Label className="update-employee-label">Joining Date</Label>
                        <input
                            type="date"
                            className={`update-employee-input ${joiningDateError ? 'input-error' : ''}`}
                            value={joiningDate}
                            onChange={handleChange(setJoiningDate, setJoiningDateError)}
                        />
                        {joiningDateError && (
                            <div className="error-message">
                                {joiningDateError}
                            </div>
                        )}
                    </div>
                    <div className="update-employee-buttons">
                        <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                        <button type="submit" className="update-employee-button">Update</button>
                    </div>
                </form>
                <Modal
                    isOpen={isModalOpen}
                    onDismiss={closeModal}
                    isBlocking={false}
                >
                    <div className="modal-content">
                        <h2>Update Successful</h2>
                        <p>The employee data has been updated successfully.</p>
                        <button onClick={closeModal}>OK</button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default EmployeeUpdate;
