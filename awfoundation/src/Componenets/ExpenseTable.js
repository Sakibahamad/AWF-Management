import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@fluentui/react/lib/Modal';
import './ExpenseTable.css'; // Ensure you have styles for the icons and other elements
// import homen from './Home.jpg'; // Home image
import updateIcon from './update.png'; // Ensure this path is correct
import deleteIcon from './delete.png'; // Ensure this path is correct

const ExpenseTable = () => {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' }); // Sorting state
    const navigate = useNavigate();

    // Fetch records data
    const fetchRecords = async () => {
        try {
            const response = await axios.get('https://66cef006901aab24842037e7.mockapi.io/Expence');
            setRecords(response.data);
            setFilteredRecords(response.data); // Initialize with all records
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    // Filter records by category
    useEffect(() => {
        if (searchQuery) {
            const lowercasedQuery = searchQuery.toLowerCase();
            const filtered = records.filter(record =>
                record.category.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredRecords(filtered);
        } else {
            setFilteredRecords(records);
        }
    }, [searchQuery, records]);

    // Sort records by the specified column
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedRecords = [...filteredRecords].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setFilteredRecords(sortedRecords);
    };

    // Determine the sort icon to display
    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? '⬆️' : '⬇️'; // Up or down arrow
        }
        return '↕️'; // Neutral arrow
    };

    // Navigate to Update page
    const handleUpdate = (id) => {
        navigate(`/ExpenseUpdate/${id}`);
    };

    // Navigate to Homepage2
    const handleHomeClick = () => {
        navigate('/homepage2');
    };

    // Open delete modal
    const handleDeleteClick = (record) => {
        setSelectedRecord(record);
        setIsDeleteModalOpen(true);
    };

    // Perform deletion
    const handleDelete = async () => {
        if (selectedRecord) {
            try {
                await axios.delete(`https://66cef006901aab24842037e7.mockapi.io/Expence/${selectedRecord.id}`);
                setRecords(prevRecords => prevRecords.filter(record => record.id !== selectedRecord.id));
                setFilteredRecords(prevFiltered => prevFiltered.filter(record => record.id !== selectedRecord.id));
                setIsDeleteModalOpen(false);
                setSelectedRecord(null);
            } catch (error) {
                console.error('Error deleting record:', error);
            }
        }
    };

    // Close delete modal
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedRecord(null);
    };

    // Open create modal
    const handleAddRecord = () => {
        navigate('/AddExpense');
        // setIsCreateModalOpen(true);
    };

    // Close create modal and refresh the records list
    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
        fetchRecords(); // Refresh the records list after closing the Create modal
    };

    return (
        <div className="read-container">
            {/* Image at top-left, clickable to navigate to Homepage2 */}
            {/* <img 
                src={homen} 
                alt="Home" 
                title='Home'
                className="home-icon" 
                onClick={handleHomeClick} 
                style={{ cursor: 'pointer', position: 'absolute', top: '10px', left: '10px' }} 
            /> */}
            <h2 className="read-heading">Expense Records</h2>
            <button className="add-button" onClick={handleAddRecord}>Add</button>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by category"
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <table className="record-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('date')}>
                            Date {getSortIcon('date')}
                        </th>
                        <th onClick={() => handleSort('reason')}>
                            Reason {getSortIcon('reason')}
                        </th>
                        <th onClick={() => handleSort('category')}>
                            Category {getSortIcon('category')}
                        </th>
                        <th onClick={() => handleSort('amount')}>
                            Amount {getSortIcon('amount')}
                        </th>
                        <th onClick={() => handleSort('paymentMode')}>
                            Payment Mode {getSortIcon('paymentMode')}
                        </th>
                        <th onClick={() => handleSort('description')}>
                            Description {getSortIcon('description')}
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRecords.length > 0 ? (
                        filteredRecords.map(record => (
                            <tr key={record.id}>
                                <td>{record.date}</td>
                                <td>{record.reason}</td>
                                <td>{record.category}</td>
                                <td>{record.amount}</td>
                                <td>{record.paymentMode}</td>
                                <td>{record.description}</td>
                                <td>
                                    <img
                                        title='Update'
                                        src={updateIcon}
                                        alt="Update"
                                        className="action-icon"
                                        onClick={() => handleUpdate(record.id)}
                                        style={{ width: '20px', cursor: 'pointer' }}
                                    />
                                    <img
                                        title='Delete'
                                        src={deleteIcon}
                                        alt="Delete"
                                        className="action-icon"
                                        onClick={() => handleDeleteClick(record)}
                                        style={{ width: '20px', cursor: 'pointer', marginLeft: '10px' }}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No records found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onDismiss={closeDeleteModal}
                isBlocking={false}
                containerClassName="modal-container"
            >
                <div className="modal-header">
                    <h2 className="modal-heading">Confirmation !</h2>
                </div>
                <div className="modal-body">
                    <p>Are you sure you want to delete this record?</p>
                    <div className="modal-actions">
                    <button className="cancel-button" onClick={closeDeleteModal}>No</button>
                        <button className="confirm-button" onClick={handleDelete}>Yes</button>
                    </div>
                </div>
            </Modal>

        </div>
    );
};

export default ExpenseTable;
