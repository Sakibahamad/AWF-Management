import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@fluentui/react/lib/Modal';
import { Label } from '@fluentui/react/lib/Label';
import { IconButton } from '@fluentui/react/lib/Button';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import './AddInventory.css';

initializeIcons();

const AddInventory = ({ handlePageChange }) => {
    const [seriesNo, setSeriesNo] = useState('');
    const [date, setDate] = useState('');
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [unitOfMeasurement, setUnitOfMeasurement] = useState('');
    const [size, setSize] = useState('');
    const [description, setDescription] = useState(''); // New state
    const [seriesNoError, setSeriesNoError] = useState('');
    const [dateError, setDateError] = useState('');
    const [itemNameError, setItemNameError] = useState('');
    const [quantityError, setQuantityError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [unitOfMeasurementError, setUnitOfMeasurementError] = useState('');
    const [sizeError, setSizeError] = useState('');
    const [descriptionError, setDescriptionError] = useState(''); // New error state
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
            const response = await axios.post('https://667d27ca297972455f63c326.mockapi.io/crud-Donation', {
                seriesNo,
                date,
                itemName,
                quantity,
                category,
                unitOfMeasurement,
                size,
                description, // Include description in the submission
            });

            console.log('Form data submitted successfully:', response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate('/inventory'); // Navigate to InventoryTable after submission
    };

    const handleCancel = () => {
        navigate('/inventory'); // Navigate to InventoryTable on cancel
    };

    const categoryOptions = [
        { value: 'Grocery', label: 'Grocery' },
        { value: 'Stationary', label: 'Stationary' },
        { value: 'Cloths', label: 'Cloths' },
        { value: 'Medicine', label: 'Medicine' },
        { value: 'Toiletries', label: 'Toiletries' },
        { value: 'Other', label: 'Other' }
    ];

    const unitOptions = [
        { value: 'Units', label: 'Units' },
        { value: 'kg', label: 'kg' },
        { value: 'Pieces', label: 'Pieces' },
        { value: 'Liters', label: 'Liters' },
        { value: 'Other', label: 'Other' }
    ];

    const validateForm = () => {
        let isValid = true;

        if (seriesNo.trim() === '') {
            setSeriesNoError('Series No field is required.');
            isValid = false;
        } else {
            setSeriesNoError('');
        }

        if (date.trim() === '') {
            setDateError('Date field is required.');
            isValid = false;
        } else {
            setDateError('');
        }

        if (itemName.trim() === '') {
            setItemNameError('Item Name field is required.');
            isValid = false;
        } else {
            setItemNameError('');
        }

        if (quantity.trim() === '' || isNaN(quantity)) {
            setQuantityError('Quantity must be a number and is required.');
            isValid = false;
        } else {
            setQuantityError('');
        }

        if (category.trim() === '') {
            setCategoryError('Category field is required.');
            isValid = false;
        } else {
            setCategoryError('');
        }

        if (unitOfMeasurement.trim() === '') {
            setUnitOfMeasurementError('Unit of Measurement field is required.');
            isValid = false;
        } else {
            setUnitOfMeasurementError('');
        }

        if (category === 'Cloths' && size.trim() === '') {
            setSizeError('Size field is required for Cloths category.');
            isValid = false;
        } else {
            setSizeError('');
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
        <div className="create-inventory-form-container">
            <div className="create-inventory-form-wrapper">
                <h2 className="create-inventory-form-heading">Add Inventory Data</h2>
                <form onSubmit={handleSubmit}>
                    <div className="create-inventory-form-group">
                        <Label className="create-inventory-form-label">Series No</Label>
                        <input
                            placeholder="Enter series number"
                            type="text"
                            className={`create-inventory-form-input ${seriesNoError ? 'input-error' : ''}`}
                            value={seriesNo}
                            onChange={handleChange(setSeriesNo, setSeriesNoError)}
                        />
                        {seriesNoError && (
                            <div className="create-inventory-form-error-message">
                                {seriesNoError}
                            </div>
                        )}
                    </div>
                    <div className="create-inventory-form-group">
                        <Label className="create-inventory-form-label">Date</Label>
                        <input
                            type="date"
                            className={`create-inventory-form-input ${dateError ? 'input-error' : ''}`}
                            value={date}
                            onChange={handleChange(setDate, setDateError)}
                        />
                        {dateError && (
                            <div className="create-inventory-form-error-message">
                                {dateError}
                            </div>
                        )}
                    </div>
                    <div className="create-inventory-form-group">
                        <Label className="create-inventory-form-label">Item Name</Label>
                        <input
                            placeholder="Enter item name"
                            type="text"
                            className={`create-inventory-form-input ${itemNameError ? 'input-error' : ''}`}
                            value={itemName}
                            onChange={handleChange(setItemName, setItemNameError)}
                        />
                        {itemNameError && (
                            <div className="create-inventory-form-error-message">
                                {itemNameError}
                            </div>
                        )}
                    </div>
                    <div className="create-inventory-form-group">
                        <Label className="create-inventory-form-label">Quantity</Label>
                        <input
                            placeholder="Enter quantity"
                            type="number"
                            className={`create-inventory-form-input ${quantityError ? 'input-error' : ''}`}
                            value={quantity}
                            onChange={handleChange(setQuantity, setQuantityError)}
                        />
                        {quantityError && (
                            <div className="create-inventory-form-error-message">
                                {quantityError}
                            </div>
                        )}
                    </div>
                    <div className="create-inventory-form-group">
                        <Label className="create-inventory-form-label">Category</Label>
                        <select
                            className={`create-inventory-form-select ${categoryError ? 'input-error' : ''}`}
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
                            <div className="create-inventory-form-error-message">
                                {categoryError}
                            </div>
                        )}
                    </div>
                    <div className="create-inventory-form-group">
                        <Label className="create-inventory-form-label">Unit of Measurement</Label>
                        <select
                            className={`create-inventory-form-select ${unitOfMeasurementError ? 'input-error' : ''}`}
                            value={unitOfMeasurement}
                            onChange={(e) => {
                                setUnitOfMeasurement(e.target.value);
                                if (e.target.value === '') {
                                    setUnitOfMeasurementError('Unit of Measurement field is required.');
                                } else {
                                    setUnitOfMeasurementError('');
                                }
                            }}
                        >
                            <option value="">Select Unit</option>
                            {unitOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {unitOfMeasurementError && (
                            <div className="create-inventory-form-error-message">
                                {unitOfMeasurementError}
                            </div>
                        )}
                    </div>
                    {category === 'Cloths' && (
                        <div className="create-inventory-form-group">
                            <Label className="create-inventory-form-label">Size</Label>
                            <input
                                placeholder="Enter size"
                                type="text"
                                className={`create-inventory-form-input ${sizeError ? 'input-error' : ''}`}
                                value={size}
                                onChange={handleChange(setSize, setSizeError)}
                            />
                            {sizeError && (
                                <div className="create-inventory-form-error-message">
                                    {sizeError}
                                </div>
                            )}
                        </div>
                    )}
                    <div className="create-inventory-form-group">
                        <Label className="create-inventory-form-label">Description</Label>
                        <textarea
                            placeholder="Enter description"
                            className={`create-inventory-form-textarea ${descriptionError ? 'input-error' : ''}`}
                            value={description}
                            onChange={handleChange(setDescription, setDescriptionError)}
                        />
                        {descriptionError && (
                            <div className="create-inventory-form-error-message">
                                {descriptionError}
                            </div>
                        )}
                    </div>
                    <div className="create-inventory-form-buttons">
                        
                        <button type="button" className="create-inventory-form-cancel-button" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button type="submit" className="create-inventory-form-submit-button">
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
                    <p>Inventory data has been successfully added.</p>
                    <button onClick={closeModal} className="modal-close-button">
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default AddInventory;
