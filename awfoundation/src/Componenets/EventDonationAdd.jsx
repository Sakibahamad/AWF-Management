import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@fluentui/react/lib/Modal';
import { Label } from '@fluentui/react/lib/Label';
import { initializeIcons } from '@fluentui/font-icons-mdl2';

initializeIcons();

const EventDonationAdd = () => {
    const [donarName, setDonarName] = useState('');
    const [pan, setPan] = useState('');
    const [date, setDate] = useState('');
    const [modeOfPayment, setModeOfPayment] = useState('');
    const [amount, setAmount] = useState('');
    const [event, setEvent] = useState('');
    const [donarNameError, setDonarNameError] = useState('');
    const [panError, setPanError] = useState('');
    const [dateError, setDateError] = useState('');
    const [modeOfPaymentError, setModeOfPaymentError] = useState('');
    const [amountError, setAmountError] = useState('');
    const [eventError, setEventError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

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
            await axios.post('https://66e7cf09b17821a9d9da0963.mockapi.io/EventDonation', {
                Donar_Name: donarName,
                Pan: pan,
                Date: date,
                ModeOfPayment: modeOfPayment,
                Amount: amount,
                Event: event,
            });

            setIsModalOpen(true);
        } catch (error) {
            console.error('Error submitting donation data:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate('/event-yearly');
    };

    const handleCancel = () => {
        navigate('/event-yearly');
    };

    const modeOptions = [
        { value: 'Cash', label: 'Cash' },
        { value: 'Online', label: 'Online' },
        { value: 'Cheque', label: 'Cheque' },
        { value: 'Other', label: 'Other' }
    ];

    const validateForm = () => {
        let isValid = true;

        if (donarName.trim() === '') {
            setDonarNameError('Donar Name field is required.');
            isValid = false;
        } else {
            setDonarNameError('');
        }

        if (pan.trim() === '') {
            setPanError('PAN field is required.');
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

        if (modeOfPayment.trim() === '') {
            setModeOfPaymentError('Mode of Payment field is required.');
            isValid = false;
        } else {
            setModeOfPaymentError('');
        }

        if (amount.trim() === '' || isNaN(amount)) {
            setAmountError('Amount must be a number and is required.');
            isValid = false;
        } else {
            setAmountError('');
        }

        if (event.trim() === '') {
            setEventError('Event field is required.');
            isValid = false;
        } else {
            setEventError('');
        }

        return isValid;
    };

    return (
        <div className="create-donation-form-container">
            <div className="create-donation-form-wrapper">
                <h2 className="create-donation-form-heading">Add Event Donation</h2>
                <form onSubmit={handleSubmit}>
                    <div className="create-donation-form-group">
                        <Label className="create-donation-form-label">Donar Name</Label>
                        <input
                            placeholder="Enter Donar Name"
                            type="text"
                            className={`create-donation-form-input ${donarNameError ? 'input-error' : ''}`}
                            value={donarName}
                            onChange={handleChange(setDonarName, setDonarNameError)}
                        />
                        {donarNameError && (
                            <div className="create-donation-form-error-message">
                                {donarNameError}
                            </div>
                        )}
                    </div>
                    <div className="create-donation-form-group">
                        <Label className="create-donation-form-label">PAN</Label>
                        <input
                            placeholder="Enter PAN"
                            type="text"
                            className={`create-donation-form-input ${panError ? 'input-error' : ''}`}
                            value={pan}
                            onChange={handleChange(setPan, setPanError)}
                        />
                        {panError && (
                            <div className="create-donation-form-error-message">
                                {panError}
                            </div>
                        )}
                    </div>
                    <div className="create-donation-form-group">
                        <Label className="create-donation-form-label">Date</Label>
                        <input
                            type="date"
                            className={`create-donation-form-input ${dateError ? 'input-error' : ''}`}
                            value={date}
                            onChange={handleChange(setDate, setDateError)}
                        />
                        {dateError && (
                            <div className="create-donation-form-error-message">
                                {dateError}
                            </div>
                        )}
                    </div>
                    <div className="create-donation-form-group">
                        <Label className="create-donation-form-label">Mode of Payment</Label>
                        <select
                            className={`create-donation-form-select ${modeOfPaymentError ? 'input-error' : ''}`}
                            value={modeOfPayment}
                            onChange={handleChange(setModeOfPayment, setModeOfPaymentError)}
                        >
                            <option value="">Select Mode</option>
                            {modeOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {modeOfPaymentError && (
                            <div className="create-donation-form-error-message">
                                {modeOfPaymentError}
                            </div>
                        )}
                    </div>
                    <div className="create-donation-form-group">
                        <Label className="create-donation-form-label">Amount</Label>
                        <input
                            placeholder="Enter amount"
                            type="number"
                            className={`create-donation-form-input ${amountError ? 'input-error' : ''}`}
                            value={amount}
                            onChange={handleChange(setAmount, setAmountError)}
                        />
                        {amountError && (
                            <div className="create-donation-form-error-message">
                                {amountError}
                            </div>
                        )}
                    </div>
                    <div className="create-donation-form-group">
                        <Label className="create-donation-form-label">Event</Label>
                        <textarea
                            placeholder="Enter Event details"
                            className={`create-donation-form-textarea ${eventError ? 'input-error' : ''}`}
                            value={event}
                            onChange={handleChange(setEvent, setEventError)}
                        />
                        {eventError && (
                            <div className="create-donation-form-error-message">
                                {eventError}
                            </div>
                        )}
                    </div>
                    <div className="create-donation-form-buttons">
                        <button type="button" className="create-donation-form-cancel-button" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button type="submit" className="create-donation-form-submit-button">
                            Submit
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
                    <p>Event donation has been successfully added.</p>
                    <button onClick={closeModal} className="modal-close-button">
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default EventDonationAdd;
