import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@fluentui/react/lib/Modal';
import { Label } from '@fluentui/react/lib/Label';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import './AddExpense.css';

initializeIcons();

const AddExpense = ({ handlePageChange }) => {
    const [date, setDate] = useState('');
    const [reason, setReason] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentMode, setPaymentMode] = useState('');
    const [description, setDescription] = useState('');
    const [dateError, setDateError] = useState('');
    const [reasonError, setReasonError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [amountError, setAmountError] = useState('');
    const [paymentModeError, setPaymentModeError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const handleChange = (setter, errorSetter) => (e) => {
        const value = e.target.value;
        setter(value);
        if (value.trim() === '') {
            errorSetter('This field is required.');
        } else {
            errorSetter('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post('https://66cef006901aab24842037e7.mockapi.io/Expence', {
                date,
                reason,
                category,
                amount,
                paymentMode,
                description,
            });

            console.log('Form data submitted successfully:', response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        handlePageChange('Read'); // Navigate to the Read page after submission
    };

    const handleCancel = () => {
        handlePageChange('Read'); // Navigate to the Read page
    };

    const categoryOptions = [
        { value: 'Food', label: 'Food' },
        { value: 'Transport', label: 'Transport' },
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'Other', label: 'Other' }
    ];

    const paymentModeOptions = [
        { value: 'Cash', label: 'Cash' },
        { value: 'Card', label: 'Card' },
        { value: 'UPI', label: 'UPI' },
        { value: 'Other', label: 'Other' }
    ];

    const validateForm = () => {
        let isValid = true;

        if (date.trim() === '') {
            setDateError('Date field is required.');
            isValid = false;
        } else {
            setDateError('');
        }

        if (reason.trim() === '') {
            setReasonError('Reason field is required.');
            isValid = false;
        } else {
            setReasonError('');
        }

        if (category.trim() === '') {
            setCategoryError('Category field is required.');
            isValid = false;
        } else {
            setCategoryError('');
        }

        if (amount.trim() === '' || isNaN(amount)) {
            setAmountError('Amount must be a number and is required.');
            isValid = false;
        } else {
            setAmountError('');
        }

        if (paymentMode.trim() === '') {
            setPaymentModeError('Payment mode field is required.');
            isValid = false;
        } else {
            setPaymentModeError('');
        }

        if (description.trim() === '') {
            setDescriptionError('Description field is required.');
            isValid = false;
        } else {
            setDescriptionError('');
        }

        return isValid;
    };

    return (
        <div className="create-expense-form-container">
            <div className="create-expense-form-wrapper">
                <h2 className="create-expense-form-heading">Add Expense Data</h2>
                <form onSubmit={handleSubmit}>
                    <div className="create-expense-form-group">
                        <Label className="create-expense-form-label">Date</Label>
                        <input
                            type="date"
                            className={`create-expense-form-input ${dateError ? 'input-error' : ''}`}
                            value={date}
                            onChange={handleChange(setDate, setDateError)}
                        />
                        {dateError && (
                            <div className="create-expense-form-error-message">
                                {dateError}
                            </div>
                        )}
                    </div>
                    <div className="create-expense-form-group">
                        <Label className="create-expense-form-label">Reason</Label>
                        <input
                            placeholder="Enter reason"
                            type="text"
                            className={`create-expense-form-input ${reasonError ? 'input-error' : ''}`}
                            value={reason}
                            onChange={handleChange(setReason, setReasonError)}
                        />
                        {reasonError && (
                            <div className="create-expense-form-error-message">
                                {reasonError}
                            </div>
                        )}
                    </div>
                    <div className="create-expense-form-group">
                        <Label className="create-expense-form-label">Category</Label>
                        <select
                            className={`create-expense-form-select ${categoryError ? 'input-error' : ''}`}
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                if (e.target.value === '') {
                                    setCategoryError('Category field is required.');
                                } else {
                                    setCategoryError('');
                                }
                            }}
                        >
                            <option value="">Select Category</option>
                            {categoryOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {categoryError && (
                            <div className="create-expense-form-error-message">
                                {categoryError}
                            </div>
                        )}
                    </div>
                    <div className="create-expense-form-group">
                        <Label className="create-expense-form-label">Amount</Label>
                        <input
                            placeholder="Enter amount"
                            type="number"
                            className={`create-expense-form-input ${amountError ? 'input-error' : ''}`}
                            value={amount}
                            onChange={handleChange(setAmount, setAmountError)}
                        />
                        {amountError && (
                            <div className="create-expense-form-error-message">
                                {amountError}
                            </div>
                        )}
                    </div>
                    <div className="create-expense-form-group">
                        <Label className="create-expense-form-label">Payment Mode</Label>
                        <select
                            className={`create-expense-form-select ${paymentModeError ? 'input-error' : ''}`}
                            value={paymentMode}
                            onChange={(e) => {
                                setPaymentMode(e.target.value);
                                if (e.target.value === '') {
                                    setPaymentModeError('Payment mode field is required.');
                                } else {
                                    setPaymentModeError('');
                                }
                            }}
                        >
                            <option value="">Select Payment Mode</option>
                            {paymentModeOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {paymentModeError && (
                            <div className="create-expense-form-error-message">
                                {paymentModeError}
                            </div>
                        )}
                    </div>
                    <div className="create-expense-form-group">
                        <Label className="create-expense-form-label">Description</Label>
                        <textarea
                            placeholder="Enter description"
                            className={`create-expense-form-textarea ${descriptionError ? 'input-error' : ''}`}
                            value={description}
                            onChange={handleChange(setDescription, setDescriptionError)}
                        />
                        {descriptionError && (
                            <div className="create-expense-form-error-message">
                                {descriptionError}
                            </div>
                        )}
                    </div>
                    <div className="create-expense-form-buttons">
                        <button type="button" className="create-expense-form-cancel-button" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button type="submit" className="create-expense-form-submit-button">
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            <Modal
                isOpen={isModalOpen}
                onDismiss={closeModal}
                isBlocking={false}
            >
                <div className="create-expense-form-modal-content">
                    <h3 className="create-expense-form-modal-title">Success</h3>
                    <p className="create-expense-form-modal-message">Expense data submitted successfully!</p>
                    <button className="create-expense-form-modal-button" onClick={closeModal}>OK</button>
                </div>
            </Modal>
        </div>
    );
};

export default AddExpense;
