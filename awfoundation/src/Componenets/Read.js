import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@fluentui/react/lib/Modal';
import './Read.css'; 
import homen from './Home.jpg';
import deleteIcon from './delete.png'; // Rename the import if needed
import updateIcon from './update.png'; // Rename the import if needed

const Read = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' }); // Sorting state
    const navigate = useNavigate();

    // Fetch students data
    const fetchStudents = async () => {
        try {
            const response = await axios.get('https://66cef006901aab24842037e7.mockapi.io/Student');
            setStudents(response.data);
            setFilteredStudents(response.data); // Initialize with all students
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // Filter students by name
    useEffect(() => {
        if (searchQuery) {
            const lowercasedQuery = searchQuery.toLowerCase();
            const filtered = students.filter(student =>
                student.name.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredStudents(filtered);
        } else {
            setFilteredStudents(students);
        }
    }, [searchQuery, students]);

    // Sort students by the specified column
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedStudents = [...filteredStudents].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setFilteredStudents(sortedStudents);
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
        navigate(`/student/update/${id}`);
    };

    // Navigate to Homepage2
    const handleHomeClick = () => {
        navigate('/homepage2');
    };

    // Open delete modal
    const handleDeleteClick = (student) => {
        setSelectedStudent(student);
        setIsDeleteModalOpen(true);
    };

    // Perform deletion
    const handleDelete = async () => {
        if (selectedStudent) {
            try {
                await axios.delete(`https://66cef006901aab24842037e7.mockapi.io/Student/${selectedStudent.id}`);
                setStudents(prevStudents => prevStudents.filter(student => student.id !== selectedStudent.id));
                setFilteredStudents(prevFiltered => prevFiltered.filter(student => student.id !== selectedStudent.id));
                setIsDeleteModalOpen(false);
                setSelectedStudent(null);
            } catch (error) {
                console.error('Error deleting student:', error);
            }
        }
    };

    // Close delete modal
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedStudent(null);
    };

    // Open create modal
    const handleAddStudent = () => {
        navigate('/students/Add');
    };

    // Close create modal and refresh the student list
    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
        fetchStudents(); // Refresh the student list after closing the Create modal
    };

    return (
        <div className="read-container">
            {/* Image at top-left, clickable to navigate to Homepage2 */}
            <img 
                src={homen} 
                alt="Home" 
                className="home-icon" 
                onClick={handleHomeClick} 
                style={{ cursor: 'pointer', position: 'absolute', top: '10px', left: '10px' }} 
            />
            <h2 className="read-heading">Student Data</h2>
            <button className="add-button" onClick={handleAddStudent}>Add</button>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by name"
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <table className="student-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('name')}>
                            Name {getSortIcon('name')}
                        </th>
                        <th onClick={() => handleSort('email')}>
                            Email {getSortIcon('email')}
                        </th>
                        <th onClick={() => handleSort('studentClass')}>
                            Class {getSortIcon('studentClass')}
                        </th>
                        <th onClick={() => handleSort('hobbies')}>
                            Hobbies {getSortIcon('hobbies')}
                        </th>
                        <th onClick={() => handleSort('gender')}>
                            Gender {getSortIcon('gender')}
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.length > 0 ? (
                        filteredStudents.map(student => (
                            <tr key={student.id}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.studentClass}</td>
                                <td>{student.hobbies.join(', ')}</td>
                                <td>{student.gender}</td>
                                <td>
                                    <img
                                        title='Update'
                                        src={updateIcon}
                                        alt="Update"
                                        className="icon update-icon"
                                        onClick={() => handleUpdate(student.id)}
                                        style={{ cursor: 'pointer', width: '24px', marginRight: '8px' }}
                                    />
                                    <img
                                        title='Delete'
                                        src={deleteIcon}
                                        alt="Delete"
                                        className="icon delete-icon"
                                        onClick={() => handleDeleteClick(student)}
                                        style={{ cursor: 'pointer', width: '24px' }}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No students found</td>
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
                    <h2 className="modal-heading">Confirm Deletion</h2>
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

export default Read;
