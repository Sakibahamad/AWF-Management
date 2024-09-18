import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@fluentui/react/lib/Modal';
import homen from './Home.jpg'; // Ensure this path is correct
import updateIcon from './update.png'; // Ensure this path is correct
import deleteIcon from './delete.png'; // Ensure this path is correct

const InkindTable = () => {
    const [inkinds, setInkinds] = useState([]);
    const [filteredInkinds, setFilteredInkinds] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedInkind, setSelectedInkind] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const navigate = useNavigate();

    const fetchInkinds = async () => {
        try {
            const response = await axios.get('https://66ea761055ad32cda478eccf.mockapi.io/Inkind');
            setInkinds(response.data);
            setFilteredInkinds(response.data);
        } catch (error) {
            console.error('Error fetching inkinds:', error);
        }
    };

    useEffect(() => {
        fetchInkinds();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const lowercasedQuery = searchQuery.toLowerCase();
            const filtered = inkinds.filter(inkind => {
                const matchesName = inkind.Name?.toLowerCase().includes(lowercasedQuery);
                const matchesPan = inkind.Pan?.toLowerCase().includes(lowercasedQuery);
                return matchesName || matchesPan;
            });
            setFilteredInkinds(filtered);
        } else {
            setFilteredInkinds(inkinds);
        }
    }, [searchQuery, inkinds]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedInkinds = [...filteredInkinds].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setFilteredInkinds(sortedInkinds);
    };

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? '⬆️' : '⬇️';
        }
        return '↕️';
    };

    const handleUpdate = (id) => {
        navigate(`/in-kind/update/${id}`);
    };

    const handleHomeClick = () => {
        navigate('/homepage2');
    };

    const handleDeleteClick = (inkind) => {
        setSelectedInkind(inkind);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (selectedInkind) {
            try {
                await axios.delete(`https://66e7cf09b17821a9d9da0963.mockapi.io/Inkind/${selectedInkind.id}`);
                await fetchInkinds(); // Re-fetch data after deletion
                setIsDeleteModalOpen(false);
                setSelectedInkind(null);
            } catch (error) {
                console.error('Error deleting inkind:', error);
            }
        }
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedInkind(null);
    };

    const handleAddInkind = () => {
        navigate('/inkind/add');
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
            <h2 className="read-heading">Inkind Donations</h2>

            <button className="add-button" onClick={handleAddInkind}>
                Add
            </button>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by Name or PAN"
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <table className="record-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('Name')}>
                            Name {getSortIcon('Name')}
                        </th>
                        <th onClick={() => handleSort('Pan')}>
                            PAN {getSortIcon('Pan')}
                        </th>
                        <th onClick={() => handleSort('Date')}>
                            Date {getSortIcon('Date')}
                        </th>
                        <th onClick={() => handleSort('Type')}>
                            Type {getSortIcon('Type')}
                        </th>
                        <th onClick={() => handleSort('Reason')}>
                            Reason {getSortIcon('Reason')}
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredInkinds.length > 0 ? (
                        filteredInkinds.map(inkind => (
                            <tr key={inkind.id}>
                                <td>{inkind.Name || 'N/A'}</td>
                                <td>{inkind.Pan || 'N/A'}</td>
                                <td>{inkind.Date || 'N/A'}</td>
                                <td>{inkind.Type || 'N/A'}</td>
                                <td>{inkind.Reason || 'N/A'}</td>
                                <td>
                                    <img
                                        title='Update'
                                        src={updateIcon}
                                        alt="Update"
                                        className="action-icon"
                                        onClick={() => handleUpdate(inkind.id)}
                                        style={{ width: '20px', cursor: 'pointer' }}
                                    />
                                    <img
                                        title='Delete'
                                        src={deleteIcon}
                                        alt="Delete"
                                        className="action-icon"
                                        onClick={() => handleDeleteClick(inkind)}
                                        style={{ width: '20px', cursor: 'pointer', marginLeft: '10px' }}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No records found</td>
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
                    <p>Are you sure you want to delete this inkind donation?</p>
                    <div className="modal-actions">
                        <button className="cancel-button" onClick={closeDeleteModal}>No</button>
                        <button className="confirm-button" onClick={handleDelete}>Yes</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default InkindTable;
