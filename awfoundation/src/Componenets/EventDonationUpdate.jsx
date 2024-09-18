import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '@fluentui/react/lib/Modal';
import { Label } from '@fluentui/react/lib/Label';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
// import './EventDonationUpdate.css';

initializeIcons();

const EventDonationUpdate = () => {
    const { id } = useParams();
    const [donation, setDonation] = useState(null);
    const [donorName, setDonorName] = useState('');
    const [pan, setPan] = useState('');  // New state for PAN
    const [amount, setAmount] = useState('');
    const [event, setEvent] = useState('');  // State for Event
    const [date, setDate] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [donorNameError, setDonorNameError] = useState('');
    const [panError, setPanError] = useState('');  // New error for PAN
    const [amountError, setAmountError] = useState('');
    const [eventError, setEventError] = useState('');  // Error for Event
    const [dateError, setDateError] = useState('');
    const [paymentMethodError, setPaymentMethodError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDonation = async () => {
            try {
                const response = await axios.get(`https://66e7cf09b17821a9d9da0963.mockapi.io/EventDonation/${id}`);
                console.log('API response:', response.data);
                setDonation(response.data);
                setDonorName(response.data.Donar_Name || '');
                setPan(response.data.Pan || '');  // Set PAN value
                setAmount(response.data.Amount || '');
                setEvent(response.data.Event || '');  // Set Event value
                setDate(response.data.Date || '');
                setPaymentMethod(response.data.ModeOfPayment || '');
            } catch (error) {
                console.error('Error fetching donation data:', error);
            }
        };

        fetchDonation();
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
            const response = await axios.put(`https://66e7cf09b17821a9d9da0963.mockapi.io/EventDonation/${id}`, {
                Donar_Name: donorName,
                Pan: pan,  // Include PAN in the API request
                Amount: amount,
                Event: event,  // Include Event in the API request
                Date: date,
                ModeOfPayment: paymentMethod,
            });

            console.log('Donation data updated successfully:', response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error updating donation data:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate('/event-yearly');
    };

    const handleCancel = () => {
        navigate('/event-yearly');
    };

    const validateForm = () => {
        let isValid = true;

        if (donorName.trim() === '') {
            setDonorNameError('Donor Name field is required.');
            isValid = false;
        } else {
            setDonorNameError('');
        }

        if (pan.trim() === '') {  // Validate PAN field
            setPanError('PAN field is required.');
            isValid = false;
        } else {
            setPanError('');
        }

        if (amount.trim() === '' || isNaN(amount)) {
            setAmountError('Amount must be a number and is required.');
            isValid = false;
        } else {
            setAmountError('');
        }

        if (event.trim() === '') {  // Validate Event field
            setEventError('Event field is required.');
            isValid = false;
        } else {
            setEventError('');
        }

        if (date.trim() === '') {
            setDateError('Date field is required.');
            isValid = false;
        } else {
            setDateError('');
        }

        if (paymentMethod.trim() === '') {
            setPaymentMethodError('Payment Method field is required.');
            isValid = false;
        } else {
            setPaymentMethodError('');
        }

        return isValid;
    };

    return (
        <div className="update-donation-form-container">
            <div className="update-donation-form-wrapper">
                <h2 className="update-donation-form-heading">Update Event Donation</h2>
                {donation ? (
                    <form onSubmit={handleSubmit}>
                        <div className="update-donation-form-group">
                            <Label className="update-donation-form-label">Donor Name</Label>
                            <input
                                placeholder="Enter donor name"
                                type="text"
                                className={`update-donation-form-input ${donorNameError ? 'input-error' : ''}`}
                                value={donorName}
                                onChange={handleChange(setDonorName, setDonorNameError)}
                            />
                            {donorNameError && (
                                <div className="update-donation-form-error-message">
                                    {donorNameError}
                                </div>
                            )}
                        </div>
                        <div className="update-donation-form-group">
                            <Label className="update-donation-form-label">PAN</Label>  {/* New PAN field */}
                            <input
                                placeholder="Enter PAN"
                                type="text"
                                className={`update-donation-form-input ${panError ? 'input-error' : ''}`}
                                value={pan}
                                onChange={handleChange(setPan, setPanError)}
                            />
                            {panError && (
                                <div className="update-donation-form-error-message">
                                    {panError}
                                </div>
                            )}
                        </div>
                        <div className="update-donation-form-group">
                            <Label className="update-donation-form-label">Amount</Label>
                            <input
                                placeholder="Enter amount"
                                type="number"
                                className={`update-donation-form-input ${amountError ? 'input-error' : ''}`}
                                value={amount}
                                onChange={handleChange(setAmount, setAmountError)}
                            />
                            {amountError && (
                                <div className="update-donation-form-error-message">
                                    {amountError}
                                </div>
                            )}
                        </div>
                        <div className="update-donation-form-group">
                            <Label className="update-donation-form-label">Date</Label>
                            <input
                                type="date"
                                className={`update-donation-form-input ${dateError ? 'input-error' : ''}`}
                                value={date}
                                onChange={handleChange(setDate, setDateError)}
                            />
                            {dateError && (
                                <div className="update-donation-form-error-message">
                                    {dateError}
                                </div>
                            )}
                        </div>
                        <div className="update-donation-form-group">
                            <Label className="update-donation-form-label">Payment Method</Label>
                            <select
                                className={`update-donation-form-select ${paymentMethodError ? 'input-error' : ''}`}
                                value={paymentMethod}
                                onChange={(e) => {
                                    setPaymentMethod(e.target.value);
                                    if (e.target.value === '') {
                                        setPaymentMethodError('Payment Method field is required.');
                                    } else {
                                        setPaymentMethodError('');
                                    }
                                }}
                            >
                                <option value="">Select Payment Method</option>
                                <option value="Cash">Cash</option>
                                <option value="Online">Online</option>
                                <option value="Cheque">Cheque</option>
                                <option value="Other">Other</option>
                            </select>
                            {paymentMethodError && (
                                <div className="update-donation-form-error-message">
                                    {paymentMethodError}
                                </div>
                            )}
                        </div>
                        <div className="update-donation-form-group">
                            <Label className="update-donation-form-label">Event</Label>  {/* Event field */}
                            <input
                                placeholder="Enter event name"
                                type="text"
                                className={`update-donation-form-input ${eventError ? 'input-error' : ''}`}
                                value={event}
                                onChange={handleChange(setEvent, setEventError)}
                            />
                            {eventError && (
                                <div className="update-donation-form-error-message">
                                    {eventError}
                                </div>
                            )}
                        </div>
                        <div className="update-donation-form-buttons">
                            <button type="button" className="update-donation-form-cancel" onClick={handleCancel}>
                                Cancel
                            </button>
                            <button type="submit" className="update-donation-form-submit">
                                Update
                            </button>
                        </div>
                    </form>
                ) : (
                    <p>Loading...</p>
                )}

                {isModalOpen && (
                    <Modal isOpen={isModalOpen} onDismiss={closeModal}>
                        <div className="modal-content">
                            <h3>Donation Updated Successfully!</h3>
                            <button onClick={closeModal}>Close</button>
                        </div>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default EventDonationUpdate;
