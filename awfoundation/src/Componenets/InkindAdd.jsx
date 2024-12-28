import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@fluentui/react/lib/Modal';
import { Label } from '@fluentui/react/lib/Label';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import './InkindAdd.css';

initializeIcons();

const InkindAdd = () => {
    const [name, setName] = useState('');
    const [pan, setPan] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('');
    const [reason, setReason] = useState('');
    const [nameError, setNameError] = useState('');
    const [panError, setPanError] = useState('');
    const [dateError, setDateError] = useState('');
    const [typeError, setTypeError] = useState('');
    const [reasonError, setReasonError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const handleChange = (setter, errorSetter) => (e) => {
        const value = e.target.value;
        setter(value);
        errorSetter(value.trim() === '' ? 'This field is required.' : '');
    };

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;  // PAN validation regex

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await axios.post('https://66ea761055ad32cda478eccf.mockapi.io/Inkind', {
                Name: name,
                Pan: pan,
                Date: date,
                Type: type,
                Reason: reason,
            });

            setIsModalOpen(true);
        } catch (error) {
            console.error('Error submitting in-kind donation data:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate('/in-kind');
    };

    const handleCancel = () => {
        navigate('/in-kind');
    };

    const typeOptions = [
        { value: 'Cycle', label: 'Cycle' },
        { value: 'Grocery', label: 'Grocery' },
        { value: 'Stationary', label: 'Stationary' },
        { value: 'Vegetables', label: 'Vegetables' },
        { value: 'Cloths', label: 'Cloths' },
        { value: 'Other', label: 'Other' },
    ];

    const validateForm = () => {
        let isValid = true;

        if (name.trim() === '') {
            setNameError('Name field is required.');
            isValid = false;
        } else {
            setNameError('');
        }

        if (pan.trim() === '' || !panRegex.test(pan)) {  // Validate PAN format
            setPanError('PAN must be 10 characters in the format: 5 letters, 4 digits, 1 letter.');
            isValid = false;
        } else {
            setPanError('');
        }

        if (date.trim() === '') {
            setDateError('Date field is required.');
            isValid = false;
        } else {
            setDateError('');
        }

        if (type.trim() === '') {
            setTypeError('Type field is required.');
            isValid = false;
        } else {
            setTypeError('');
        }

        if (reason.trim() === '') {
            setReasonError('Reason field is required.');
            isValid = false;
        } else {
            setReasonError('');
        }

        return isValid;
    };

    return (
        <div className="create-inkind-form-container">
            <div className="create-inkind-form-wrapper">
                <h2 className="create-inkind-form-heading">Add In-Kind Donation</h2>
                <form onSubmit={handleSubmit}>
                    <div className="create-inkind-form-group">
                        <Label className="create-inkind-form-label">Name</Label>
                        <input
                            placeholder="Enter Name"
                            type="text"
                            className={`create-inkind-form-input ${nameError ? 'input-error' : ''}`}
                            value={name}
                            onChange={handleChange(setName, setNameError)}
                        />
                        {nameError && (
                            <div className="create-inkind-form-error-message">
                                {nameError}
                            </div>
                        )}
                    </div>
                    <div className="create-inkind-form-group">
                        <Label className="create-inkind-form-label">PAN</Label>
                        <input
                            placeholder="Enter PAN"
                            type="text"
                            className={`create-inkind-form-input ${panError ? 'input-error' : ''}`}
                            value={pan}
                            onChange={handleChange(setPan, setPanError)}
                        />
                        {panError && (
                            <div className="create-inkind-form-error-message">
                                {panError}
                            </div>
                        )}
                    </div>
                    <div className="create-inkind-form-group">
                        <Label className="create-inkind-form-label">Date</Label>
                        <input
                            type="date"
                            className={`create-inkind-form-input ${dateError ? 'input-error' : ''}`}
                            value={date}
                            onChange={handleChange(setDate, setDateError)}
                        />
                        {dateError && (
                            <div className="create-inkind-form-error-message">
                                {dateError}
                            </div>
                        )}
                    </div>
                    <div className="create-inkind-form-group">
                        <Label className="create-inkind-form-label">Type</Label>
                        <select
                            className={`create-inkind-form-select ${typeError ? 'input-error' : ''}`}
                            value={type}
                            onChange={handleChange(setType, setTypeError)}
                        >
                            <option value="">Select Type</option>
                            {typeOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {typeError && (
                            <div className="create-inkind-form-error-message">
                                {typeError}
                            </div>
                        )}
                    </div>
                    <div className="create-inkind-form-group">
                        <Label className="create-inkind-form-label">Reason</Label>
                        <textarea
                            placeholder="Enter Reason"
                            className={`create-inkind-form-textarea ${reasonError ? 'input-error' : ''}`}
                            value={reason}
                            onChange={handleChange(setReason, setReasonError)}
                        />
                        {reasonError && (
                            <div className="create-inkind-form-error-message">
                                {reasonError}
                            </div>
                        )}
                    </div>
                    <div className="create-inkind-form-buttons">
                        <button type="button" className="create-inkind-form-cancel-button" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button type="submit" className="create-inkind-form-submit-button">
                            Save
                        </button>
                    </div>
                </form>
            </div>
            <Modal
                isOpen={isModalOpen}
                onDismiss={closeModal}
                isBlocking={false}
                containerClassName="modal-container"
            >
                <div className="modal-content">
                    <h3>Success</h3>
                    <p>In-kind donation has been successfully added.</p>
                    <button onClick={closeModal} className="modal-close-button">
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default InkindAdd;
