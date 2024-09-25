import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '@fluentui/react/lib/Modal';
import { Label } from '@fluentui/react/lib/Label';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import './InkideUpdate.css';

initializeIcons();

const InkideUpdate = () => {
    const { id } = useParams();
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

    useEffect(() => {
        const fetchInkide = async () => {
            try {
                const response = await axios.get(`https://66ea761055ad32cda478eccf.mockapi.io/Inkind/${id}`);
                console.log('API response:', response.data);
                setName(response.data.Name || '');
                setPan(response.data.Pan || '');
                setDate(response.data.Date || '');
                setType(response.data.Type || '');
                setReason(response.data.Reason || '');
            } catch (error) {
                console.error('Error fetching inkide data:', error);
            }
        };

        fetchInkide();
    }, [id]);

    const handleChange = (setter, errorSetter) => (e) => {
        const value = e.target.value;
        setter(value);
        errorSetter(value.trim() === '' ? 'This field is required.' : '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await axios.put(`https://66ea761055ad32cda478eccf.mockapi.io/Inkind/${id}`, {
                Name: name,
                Pan: pan,
                Date: date,
                Type: type,
                Reason: reason,
            });

            setIsModalOpen(true);
        } catch (error) {
            console.error('Error updating in-kind donation data:', error);
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

        if (pan.trim() === '') {
            setPanError('PAN field is required.');
            isValid = false;
        } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
            setPanError('Invalid PAN format. It should be in the format: XXXXX1234X.');
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
        <div className="update-inkind-form-container">
            <div className="update-inkind-form-wrapper">
                <h2 className="update-inkind-form-heading">Update In-Kind Donation</h2>
                <form onSubmit={handleSubmit}>
                    <div className="update-inkind-form-group">
                        <Label className="update-inkind-form-label">Name</Label>
                        <input
                            placeholder="Enter Name"
                            type="text"
                            className={`update-inkind-form-input ${nameError ? 'input-error' : ''}`}
                            value={name}
                            onChange={handleChange(setName, setNameError)}
                        />
                        {nameError && (
                            <div className="update-inkind-form-error-message">
                                {nameError}
                            </div>
                        )}
                    </div>
                    <div className="update-inkind-form-group">
                        <Label className="update-inkind-form-label">PAN</Label>
                        <input
                            placeholder="Enter PAN"
                            type="text"
                            className={`update-inkind-form-input ${panError ? 'input-error' : ''}`}
                            value={pan}
                            onChange={handleChange(setPan, setPanError)}
                        />
                        {panError && (
                            <div className="update-inkind-form-error-message">
                                {panError}
                            </div>
                        )}  
                    </div>
                    <div className="update-inkind-form-group">
                        <Label className="update-inkind-form-label">Date</Label>
                        <input
                            type="date"
                            className={`update-inkind-form-input ${dateError ? 'input-error' : ''}`}
                            value={date}
                            onChange={handleChange(setDate, setDateError)}
                        />
                        {dateError && (
                            <div className="update-inkind-form-error-message">
                                {dateError}
                            </div>
                        )}
                    </div>
                    <div className="update-inkind-form-group">
                        <Label className="update-inkind-form-label">Type</Label>
                        <select
                            className={`update-inkind-form-select ${typeError ? 'input-error' : ''}`}
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
                            <div className="update-inkind-form-error-message">
                                {typeError}
                            </div>
                        )}
                    </div>
                    <div className="update-inkind-form-group">
                        <Label className="update-inkind-form-label">Reason</Label>
                        <textarea
                            placeholder="Enter Reason"
                            className={`update-inkind-form-textarea ${reasonError ? 'input-error' : ''}`}
                            value={reason}
                            onChange={handleChange(setReason, setReasonError)}
                        />
                        {reasonError && (
                            <div className="update-inkind-form-error-message">
                                {reasonError}
                            </div>
                        )}
                    </div>
                    <div className="update-inkind-form-buttons">
                        <button type="button" className="update-inkind-form-cancel-button" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button type="submit" className="update-inkind-form-submit-button">
                            Update
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
                    <p>In-kind donation has been successfully updated.</p>
                    <button onClick={closeModal} className="modal-close-button">
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default InkideUpdate;
