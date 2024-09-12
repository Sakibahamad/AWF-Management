import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '@fluentui/react/lib/Modal';
import { Label } from '@fluentui/react/lib/Label';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import './ExpenseUpdate.css';

initializeIcons();

const ExpenseUpdate = ({ handlePageChange = () => {} }) => {
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
    const { id } = useParams();

    useEffect(() => {
        const fetchExpenseData = async () => {
            try {
                const response = await axios.get(`https://66cef006901aab24842037e7.mockapi.io/Expence/${id}`);
                const { date, reason, category, amount, paymentMode, description } = response.data;
                setDate(date);
                setReason(reason);
                setCategory(category);
                setAmount(amount);
                setPaymentMode(paymentMode);
                setDescription(description);
            } catch (error) {
                console.error('Error fetching expense data:', error);
            }
        };

        fetchExpenseData();
    }, [id]);

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
            const response = await axios.put(`https://66cef006901aab24842037e7.mockapi.io/Expence/${id}`, {
                date,
                reason,
                category,
                amount,
                paymentMode,
                description,
            });

            console.log('Form data updated successfully:', response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error updating form data:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate('/expenses');
    };

    const handleCancel = () => {
        navigate('/expenses'); // Navigate back to the expenses table without updating
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
        <div className="update-expense-form-container">
            <div className="update-expense-form-wrapper">
                <h2 className="update-expense-form-heading">Update Expense Data</h2>
                <form onSubmit={handleSubmit}>
                    {/* Date Input */}
                    <div className="update-expense-form-group">
                        <Label className="update-expense-form-label">Date</Label>
                        <input
                            type="date"
                            className={`update-expense-form-input ${dateError ? 'input-error' : ''}`}
                            value={date}
                            onChange={handleChange(setDate, setDateError)}
                        />
                        {dateError && (
                            <div className="update-expense-form-error-message">
                                {dateError}
                            </div>
                        )}
                    </div>

                    {/* Reason Input */}
                    <div className="update-expense-form-group">
                        <Label className="update-expense-form-label">Reason</Label>
                        <input
                            placeholder="Enter reason"
                            type="text"
                            className={`update-expense-form-input ${reasonError ? 'input-error' : ''}`}
                            value={reason}
                            onChange={handleChange(setReason, setReasonError)}
                        />
                        {reasonError && (
                            <div className="update-expense-form-error-message">
                                {reasonError}
                            </div>
                        )}
                    </div>

                    {/* Category Input */}
                    <div className="update-expense-form-group">
                        <Label className="update-expense-form-label">Category</Label>
                        <select
                            className={`update-expense-form-select ${categoryError ? 'input-error' : ''}`}
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
                            <div className="update-expense-form-error-message">
                                {categoryError}
                            </div>
                        )}
                    </div>

                    {/* Amount Input */}
                    <div className="update-expense-form-group">
                        <Label className="update-expense-form-label">Amount</Label>
                        <input
                            placeholder="Enter amount"
                            type="number"
                            className={`update-expense-form-input ${amountError ? 'input-error' : ''}`}
                            value={amount}
                            onChange={handleChange(setAmount, setAmountError)}
                        />
                        {amountError && (
                            <div className="update-expense-form-error-message">
                                {amountError}
                            </div>
                        )}
                    </div>

                    {/* Payment Mode Input */}
                    <div className="update-expense-form-group">
                        <Label className="update-expense-form-label">Payment Mode</Label>
                        <select
                            className={`update-expense-form-select ${paymentModeError ? 'input-error' : ''}`}
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
                            <div className="update-expense-form-error-message">
                                {paymentModeError}
                            </div>
                        )}
                    </div>

                    {/* Description Input */}
                    <div className="update-expense-form-group">
                        <Label className="update-expense-form-label">Description</Label>
                        <textarea
                            placeholder="Enter description"
                            className={`update-expense-form-textarea ${descriptionError ? 'input-error' : ''}`}
                            value={description}
                            onChange={handleChange(setDescription, setDescriptionError)}
                        />
                        {descriptionError && (
                            <div className="update-expense-form-error-message">
                                {descriptionError}
                            </div>
                        )}
                    </div>

                    <div className="update-expense-form-buttons">
                        <button type="button" className="update-expense-form-cancel-button" onClick={handleCancel}>Cancel</button>
                        <button type="submit" className="update-expense-form-submit-button">Update</button>
                    </div>
                </form>

                <Modal
                    isOpen={isModalOpen}
                    onDismiss={closeModal}
                    isBlocking={false}
                >
                    <div className="modal-content">
                        <p>Form data updated successfully.</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default ExpenseUpdate;
