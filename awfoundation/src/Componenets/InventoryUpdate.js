import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '@fluentui/react/lib/Modal';
import { Label } from '@fluentui/react/lib/Label';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import './InventoryUpdate.css';

initializeIcons();

const InventoryUpdate = () => {
    const { id } = useParams();
    const [inventory, setInventory] = useState(null);
    const [seriesNo, setSeriesNo] = useState('');
    const [date, setDate] = useState('');
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [unitOfMeasurement, setUnitOfMeasurement] = useState('');
    const [size, setSize] = useState('');
    const [description, setDescription] = useState('');
    const [seriesNoError, setSeriesNoError] = useState('');
    const [dateError, setDateError] = useState('');
    const [itemNameError, setItemNameError] = useState('');
    const [quantityError, setQuantityError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [unitOfMeasurementError, setUnitOfMeasurementError] = useState('');
    const [sizeError, setSizeError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await axios.get(`https://667d27ca297972455f63c326.mockapi.io/crud-Donation/${id}`);
                setInventory(response.data);
                setSeriesNo(response.data.seriesNo);
                setDate(response.data.date);
                setItemName(response.data.itemName);
                setQuantity(response.data.quantity);
                setCategory(response.data.category);
                setUnitOfMeasurement(response.data.unitOfMeasurement);
                setSize(response.data.size || '');
                setDescription(response.data.description);
            } catch (error) {
                console.error('Error fetching inventory data:', error);
            }
        };

        fetchInventory();
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
            const response = await axios.put(`https://667d27ca297972455f63c326.mockapi.io/crud-Donation/${id}`, {
                seriesNo,
                date,
                itemName,
                quantity,
                category,
                unitOfMeasurement,
                size,
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
        navigate('/inventory');
    };

    const handleCancel = () => {
        navigate('/inventory');
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
        <div className="update-inventory-form-container">
            <div className="update-inventory-form-wrapper">
                <h2 className="update-inventory-form-heading">Update Inventory Data</h2>
                {inventory ? (
                    <form onSubmit={handleSubmit}>
                        <div className="update-inventory-form-group">
                            <Label className="update-inventory-form-label">Series No</Label>
                            <input
                                placeholder="Enter series number"
                                type="text"
                                className={`update-inventory-form-input ${seriesNoError ? 'input-error' : ''}`}
                                value={seriesNo}
                                onChange={handleChange(setSeriesNo, setSeriesNoError)}
                            />
                            {seriesNoError && (
                                <div className="update-inventory-form-error-message">
                                    {seriesNoError}
                                </div>
                            )}
                        </div>
                        <div className="update-inventory-form-group">
                            <Label className="update-inventory-form-label">Date</Label>
                            <input
                                type="date"
                                className={`update-inventory-form-input ${dateError ? 'input-error' : ''}`}
                                value={date}
                                onChange={handleChange(setDate, setDateError)}
                            />
                            {dateError && (
                                <div className="update-inventory-form-error-message">
                                    {dateError}
                                </div>
                            )}
                        </div>
                        <div className="update-inventory-form-group">
                            <Label className="update-inventory-form-label">Item Name</Label>
                            <input
                                placeholder="Enter item name"
                                type="text"
                                className={`update-inventory-form-input ${itemNameError ? 'input-error' : ''}`}
                                value={itemName}
                                onChange={handleChange(setItemName, setItemNameError)}
                            />
                            {itemNameError && (
                                <div className="update-inventory-form-error-message">
                                    {itemNameError}
                                </div>
                            )}
                        </div>
                        <div className="update-inventory-form-group">
                            <Label className="update-inventory-form-label">Quantity</Label>
                            <input
                                placeholder="Enter quantity"
                                type="number"
                                className={`update-inventory-form-input ${quantityError ? 'input-error' : ''}`}
                                value={quantity}
                                onChange={handleChange(setQuantity, setQuantityError)}
                            />
                            {quantityError && (
                                <div className="update-inventory-form-error-message">
                                    {quantityError}
                                </div>
                            )}
                        </div>
                        <div className="update-inventory-form-group">
                            <Label className="update-inventory-form-label">Category</Label>
                            <select
                                className={`update-inventory-form-select ${categoryError ? 'input-error' : ''}`}
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
                                <div className="update-inventory-form-error-message">
                                    {categoryError}
                                </div>
                            )}
                        </div>
                        <div className="update-inventory-form-group">
                            <Label className="update-inventory-form-label">Unit of Measurement</Label>
                            <select
                                className={`update-inventory-form-select ${unitOfMeasurementError ? 'input-error' : ''}`}
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
                                <div className="update-inventory-form-error-message">
                                    {unitOfMeasurementError}
                                </div>
                            )}
                        </div>
                        {category === 'Cloths' && (
                            <div className="update-inventory-form-group">
                                <Label className="update-inventory-form-label">Size</Label>
                                <input
                                    placeholder="Enter size"
                                    type="text"
                                    className={`update-inventory-form-input ${sizeError ? 'input-error' : ''}`}
                                    value={size}
                                    onChange={handleChange(setSize, setSizeError)}
                                />
                                {sizeError && (
                                    <div className="update-inventory-form-error-message">
                                        {sizeError}
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="update-inventory-form-group">
                            <Label className="update-inventory-form-label">Description</Label>
                            <textarea
                                placeholder="Enter description"
                                className={`update-inventory-form-textarea ${descriptionError ? 'input-error' : ''}`}
                                value={description}
                                onChange={handleChange(setDescription, setDescriptionError)}
                            />
                            {descriptionError && (
                                <div className="update-inventory-form-error-message">
                                    {descriptionError}
                                </div>
                            )}
                        </div>
                        <div className="update-inventory-form-buttons">
                           
                            <button type="button" className="update-inventory-form-cancel" onClick={handleCancel}>
                                Cancel
                            </button>
                            <button type="submit" className="update-inventory-form-submit">
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
                            <h3>Inventory Updated Successfully!</h3>
                            <button onClick={closeModal}>Close</button>
                        </div>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default InventoryUpdate;
