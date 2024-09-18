import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@fluentui/react/lib/Modal';
import { Label } from '@fluentui/react/lib/Label';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import './EmployeeAdd.css';

initializeIcons();

const EmployeeAdd = () => {
    const [employeeName, setEmployeeName] = useState('');
    const [role, setRole] = useState('');
    const [salary, setSalary] = useState('');
    const [location, setLocation] = useState('');
    const [aadharNo, setAadharNo] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [joiningDate, setJoiningDate] = useState('');
    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const roleOptions = [
        { value: 'Founder', label: 'Founder' },
        { value: 'Administrator', label: 'Administrator' },
        { value: 'Worker', label: 'Worker' },
        { value: 'Consultant', label: 'Consultant' },
        { value: 'Care Taker', label: 'Care Taker' }
    ];

    const handleChange = (setter, field) => (e) => {
        setter(e.target.value);
        if (e.target.value.trim() === '') {
            setErrors((prev) => ({ ...prev, [field]: 'This field is required.' }));
        } else {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (employeeName.trim() === '') newErrors.employeeName = 'Employee Name is required.';
        if (role.trim() === '') newErrors.role = 'Role is required.';
        if (salary.trim() === '' || isNaN(salary)) newErrors.salary = 'Salary must be a number.';
        if (location.trim() === '') newErrors.location = 'Location is required.';
        if (aadharNo.trim() === '') newErrors.aadharNo = 'Aadhar No is required.';
        else if (!validateAadharNumber(aadharNo)) newErrors.aadharNo = 'Aadhar No must be exactly 12 digits.';
        if (mobileNo.trim() === '' || isNaN(mobileNo)) newErrors.mobileNo = 'Mobile No must be a number.';
        if (joiningDate.trim() === '') newErrors.joiningDate = 'Joining Date is required.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateAadharNumber = (value) => {
        // Remove spaces and check if length is exactly 12
        const cleanedValue = value.replace(/\s+/g, '');
        return cleanedValue.length === 12 && /^\d+$/.test(cleanedValue);
    };

    const formatAadharNumber = (value) => {
        // Allow digits and spaces
        value = value.replace(/[^0-9 ]/g, '');

        // Auto-format the Aadhar number to `XXXX XXXX XXXX` format
        if (value.length > 0) {
            value = value
                .replace(/(\d{4})(?=\d)/g, '$1 ')  // Add space after every 4 digits if followed by more digits
                .trim();  // Remove trailing spaces
        }

        return value;
    };

    const handleAadharChange = (e) => {
        const formattedValue = formatAadharNumber(e.target.value);
        setAadharNo(formattedValue);
        if (validateAadharNumber(formattedValue)) {
            setErrors((prev) => ({ ...prev, aadharNo: '' }));
        } else {
            setErrors((prev) => ({ ...prev, aadharNo: 'Aadhar No must be exactly 12 digits.' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Remove spaces from Aadhar number before sending to backend
        const cleanedAadharNo = aadharNo.replace(/\s+/g, '');

        try {
            const response = await axios.post('https://66e289c4494df9a478e20f0e.mockapi.io/Employee', {
                employeeName,
                role,
                salary,
                location,
                aadharNo: cleanedAadharNo,
                mobileNo,
                joiningDate
            });

            console.log('Employee data submitted successfully:', response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate('/employee');
    };

    const handleCancel = () => {
        navigate('/employee');
    };

    return (
        <div className="create-employee-form-container">
            <div className="create-employee-form-wrapper">
                <h2 className="create-employee-form-heading">Add Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="create-employee-form-group">
                        <Label className="create-employee-form-label">Employee Name</Label>
                        <input
                            placeholder="Enter employee name"
                            type="text"
                            className={`create-employee-form-input ${errors.employeeName ? 'input-error' : ''}`}
                            value={employeeName}
                            onChange={handleChange(setEmployeeName, 'employeeName')}
                        />
                        {errors.employeeName && <div className="create-employee-form-error">{errors.employeeName}</div>}
                    </div>
                    <div className="create-employee-form-group">
                        <Label className="create-employee-form-label">Role</Label>
                        <select
                            className={`create-employee-form-select ${errors.role ? 'input-error' : ''}`}
                            value={role}
                            onChange={handleChange(setRole, 'role')}
                        >
                            <option value="">Select Role</option>
                            {roleOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {errors.role && <div className="create-employee-form-error">{errors.role}</div>}
                    </div>
                    <div className="create-employee-form-group">
                        <Label className="create-employee-form-label">Salary</Label>
                        <input
                            placeholder="Enter salary"
                            type="number"
                            className={`create-employee-form-input ${errors.salary ? 'input-error' : ''}`}
                            value={salary}
                            onChange={handleChange(setSalary, 'salary')}
                        />
                        {errors.salary && <div className="create-employee-form-error">{errors.salary}</div>}
                    </div>
                    <div className="create-employee-form-group">
                        <Label className="create-employee-form-label">Location</Label>
                        <input
                            placeholder="Enter location"
                            type="text"
                            className={`create-employee-form-input ${errors.location ? 'input-error' : ''}`}
                            value={location}
                            onChange={handleChange(setLocation, 'location')}
                        />
                        {errors.location && <div className="create-employee-form-error">{errors.location}</div>}
                    </div>
                    <div className="create-employee-form-group">
                        <Label className="create-employee-form-label">Aadhar No</Label>
                        <input
                            placeholder="Enter Aadhar No"
                            type="text"
                            className={`create-employee-form-input ${errors.aadharNo ? 'input-error' : ''}`}
                            value={aadharNo}
                            onChange={handleAadharChange}
                        />
                        {errors.aadharNo && <div className="create-employee-form-error">{errors.aadharNo}</div>}
                    </div>
                    <div className="create-employee-form-group">
                        <Label className="create-employee-form-label">Mobile No</Label>
                        <input
                            placeholder="Enter mobile number"
                            type="text"
                            className={`create-employee-form-input ${errors.mobileNo ? 'input-error' : ''}`}
                            value={mobileNo}
                            onChange={handleChange(setMobileNo, 'mobileNo')}
                        />
                        {errors.mobileNo && <div className="create-employee-form-error">{errors.mobileNo}</div>}
                    </div>
                    <div className="create-employee-form-group">
                        <Label className="create-employee-form-label">Joining Date</Label>
                        <input
                            type="date"
                            className={`create-employee-form-input ${errors.joiningDate ? 'input-error' : ''}`}
                            value={joiningDate}
                            onChange={handleChange(setJoiningDate, 'joiningDate')}
                        />
                        {errors.joiningDate && <div className="create-employee-form-error">{errors.joiningDate}</div>}
                    </div>
                    <div className="create-employee-form-buttons">
                        <button type="button" className="create-employee-form-cancel-button" onClick={handleCancel}>Cancel</button>
                        <button type="submit" className="create-employee-form-submit-button">Submit</button>
                    </div>
                </form>
            </div>

            <Modal
                isOpen={isModalOpen}
                onDismiss={closeModal}
                isBlocking={false}
                className="confirmation-modal"
            >
                <div className="confirmation-modal-content">
                    <h2>Success</h2>
                    <p>Employee added successfully.</p>
                    <button className="confirmation-modal-button" onClick={closeModal}>OK</button>
                </div>
            </Modal>
        </div>
    );
};

export default EmployeeAdd;
