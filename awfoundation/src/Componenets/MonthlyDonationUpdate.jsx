import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '@fluentui/react/lib/Modal';
import { Label } from '@fluentui/react/lib/Label';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import './MonthlyDonationUpdate.css';

initializeIcons();

const MonthlyDonationUpdate = () => {
    const { id } = useParams();
    const [donation, setDonation] = useState(null);
    const [donarName, setDonarName] = useState('');
    const [pan, setPan] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [modeOfPayment, setModeOfPayment] = useState('');
    const [donarNameError, setDonarNameError] = useState('');
    const [panError, setPanError] = useState('');
    const [amountError, setAmountError] = useState('');
    const [dateError, setDateError] = useState('');
    const [modeOfPaymentError, setModeOfPaymentError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDonation = async () => {
            try {
                const response = await axios.get(`https://66e7cf09b17821a9d9da0963.mockapi.io/monthlyDonation/${id}`);
                setDonation(response.data);
                setDonarName(response.data.Donar_Name || '');
                setPan(response.data.Pan || '');
                setAmount(response.data.Amount || '');
                setDate(response.data.Date || '');
                setModeOfPayment(response.data.ModeOfPayment || '');
            } catch (error) {
                console.error('Error fetching donation data:', error);
            }
        };

        fetchDonation();
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
            const response = await axios.put(`https://66e7cf09b17821a9d9da0963.mockapi.io/monthlyDonation/${id}`, {
                Donar_Name: donarName,
                Pan: pan,
                Amount: amount,
                Date: date,
                ModeOfPayment: modeOfPayment,
            });

            console.log('Donation data updated successfully:', response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error updating donation data:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate('/monthly');
    };

    const handleCancel = () => {
        navigate('/monthly');
    };

    const validateForm = () => {
        let isValid = true;

        if (donarName.trim() === '') {
            setDonarNameError('Donor Name field is required.');
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

        if (amount.trim() === '' || isNaN(amount)) {
            setAmountError('Amount must be a number and is required.');
            isValid = false;
        } else {
            setAmountError('');
        }

        if (date.trim() === '') {
            setDateError('Date field is required.');
            isValid = false;
        } else {
            setDateError('');
        }

        if (modeOfPayment.trim() === '') {
            setModeOfPaymentError('Payment Method field is required.');
            isValid = false;
        } else {
            setModeOfPaymentError('');
        }

        return isValid;
    };

    return (
        <div className="update-donation-form-container">
            <div className="update-donation-form-wrapper">
                <h2 className="update-donation-form-heading">Update Monthly Donation</h2>
                {donation ? (
                    <form onSubmit={handleSubmit}>
                        <div className="update-donation-form-group">
                            <Label className="update-donation-form-label">Donor Name</Label>
                            <input
                                placeholder="Enter donor name"
                                type="text"
                                className={`update-donation-form-input ${donarNameError ? 'input-error' : ''}`}
                                value={donarName}
                                onChange={handleChange(setDonarName, setDonarNameError)}
                            />
                            {donarNameError && (
                                <div className="update-donation-form-error-message">
                                    {donarNameError}
                                </div>
                            )}
                        </div>
                        <div className="update-donation-form-group">
                            <Label className="update-donation-form-label">PAN</Label>
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
                            <Label className="update-donation-form-label">Mode of Payment</Label>
                            <select
                                className={`update-donation-form-select ${modeOfPaymentError ? 'input-error' : ''}`}
                                value={modeOfPayment}
                                onChange={handleChange(setModeOfPayment, setModeOfPaymentError)}
                            >
                                <option value="">Select Payment Method</option>
                                <option value="Cash">Cash</option>
                                <option value="Online">Online</option>
                                <option value="Cheque">Cheque</option>
                                <option value="Other">Other</option>
                            </select>
                            {modeOfPaymentError && (
                                <div className="update-donation-form-error-message">
                                    {modeOfPaymentError}
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

export default MonthlyDonationUpdate;
