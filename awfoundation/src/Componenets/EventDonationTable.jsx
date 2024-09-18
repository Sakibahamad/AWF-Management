import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@fluentui/react/lib/Modal';
import homen from './Home.jpg'; // Ensure this path is correct
import updateIcon from './update.png'; // Ensure this path is correct
import deleteIcon from './delete.png'; // Ensure this path is correct

const EventDonationTable = () => {
    const [donations, setDonations] = useState([]);
    const [filteredDonations, setFilteredDonations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDonation, setSelectedDonation] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const navigate = useNavigate();

    const fetchDonations = async () => {
        try {
            const response = await axios.get('https://66e7cf09b17821a9d9da0963.mockapi.io/EventDonation');
            setDonations(response.data);
            setFilteredDonations(response.data);
        } catch (error) {
            console.error('Error fetching donations:', error);
        }
    };

    useEffect(() => {
        fetchDonations();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const lowercasedQuery = searchQuery.toLowerCase();
            const filtered = donations.filter(donation => {
                const matchesDonarName = donation.Donar_Name?.toLowerCase().includes(lowercasedQuery);
                const matchesPan = donation.Pan?.toLowerCase().includes(lowercasedQuery);
                return matchesDonarName || matchesPan;
            });
            setFilteredDonations(filtered);
        } else {
            setFilteredDonations(donations);
        }
    }, [searchQuery, donations]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedDonations = [...filteredDonations].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setFilteredDonations(sortedDonations);
    };

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? '⬆️' : '⬇️';
        }
        return '↕️';
    };

    const handleUpdate = (id) => {
        navigate(`/event-yearly/update/${id}`);
    };

    const handleHomeClick = () => {
        navigate('/homepage2');
    };

    const handleDeleteClick = (donation) => {
        setSelectedDonation(donation);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (selectedDonation) {
            try {
                await axios.delete(`https://66e7cf09b17821a9d9da0963.mockapi.io/EventDonation/${selectedDonation.id}`);
                await fetchDonations(); // Re-fetch data after deletion
                setIsDeleteModalOpen(false);
                setSelectedDonation(null);
            } catch (error) {
                console.error('Error deleting donation:', error);
            }
        }
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedDonation(null);
    };

    const handleAddDonation = () => {
        navigate('/event-yearly/add');
    };

    return (
        <div className="read-container">
            <img 
                src={homen} 
                alt="Home" 
                className="home-icon" 
                onClick={handleHomeClick} 
                style={{ cursor: 'pointer', position: 'absolute', top: '10px', left: '10px' }} 
            />
            <h2 className="read-heading">Event Donations</h2>

            <button className="add-button" onClick={handleAddDonation}>
                Add
            </button>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by Donar Name or PAN"
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <table className="record-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('Donar_Name')}>
                            Donar Name {getSortIcon('Donar_Name')}
                        </th>
                        <th onClick={() => handleSort('Pan')}>
                            PAN {getSortIcon('Pan')}
                        </th>
                        <th onClick={() => handleSort('Date')}>
                            Date {getSortIcon('Date')}
                        </th>
                        <th onClick={() => handleSort('ModeOfPayment')}>
                            Mode of Payment {getSortIcon('ModeOfPayment')}
                        </th>
                        <th onClick={() => handleSort('Amount')}>
                            Amount {getSortIcon('Amount')}
                        </th>
                        <th onClick={() => handleSort('Event')}>
                            Event {getSortIcon('Event')}
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDonations.length > 0 ? (
                        filteredDonations.map(donation => (
                            <tr key={donation.id}>
                                <td>{donation.Donar_Name || 'N/A'}</td>
                                <td>{donation.Pan || 'N/A'}</td>
                                <td>{donation.Date || 'N/A'}</td>
                                <td>{donation.ModeOfPayment || 'N/A'}</td>
                                <td>{donation.Amount || 'N/A'}</td>
                                <td>{donation.Event || 'N/A'}</td>
                                <td>
                                    <img
                                        title='Update'
                                        src={updateIcon}
                                        alt="Update"
                                        className="action-icon"
                                        onClick={() => handleUpdate(donation.id)}
                                        style={{ width: '20px', cursor: 'pointer' }}
                                    />
                                    <img
                                        title='Delete'
                                        src={deleteIcon}
                                        alt="Delete"
                                        className="action-icon"
                                        onClick={() => handleDeleteClick(donation)}
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
                    <p>Are you sure you want to delete this donation?</p>
                    <div className="modal-actions">
                        <button className="cancel-button" onClick={closeDeleteModal}>No</button>
                        <button className="confirm-button" onClick={handleDelete}>Yes</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default EventDonationTable;
