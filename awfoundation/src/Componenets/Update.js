import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '@fluentui/react/lib/Modal';
import Select from 'react-select';
import { Label } from '@fluentui/react/lib/Label';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import './Update.css';

initializeIcons();

const Update = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [hobbies, setHobbies] = useState([]);
    const [gender, setGender] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [studentClassError, setStudentClassError] = useState('');
    const [hobbiesError, setHobbiesError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await axios.get(`https://66cef006901aab24842037e7.mockapi.io/Student/${id}`);
                const studentData = response.data;
                setStudent(studentData);
                setName(studentData.name);
                setEmail(studentData.email);
                setStudentClass(studentData.studentClass);
                setHobbies(studentData.hobbies.map(hobby => ({ value: hobby, label: hobby })));
                setGender(studentData.gender.toLowerCase());
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };

        fetchStudent();
    }, [id]);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[a-zA-Z\s]*$/;

    const handleNameChange = (e) => {
        const value = e.target.value;
        if (value.match(nameRegex) && value.length > 3) {
            setName(value);
            setNameError('');
        } else {
            setName(value);
            setNameError('Name must be more than 3 letters and contain only letters.');
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (!value.match(emailRegex)) {
            setEmailError('Invalid email address.');
        } else {
            setEmailError('');
        }
    };

    const handleStudentClassChange = (e) => {
        const value = e.target.value;
        setStudentClass(value);
        if (value === '') {
            setStudentClassError('Student class field is required.');
        } else {
            setStudentClassError('');
        }
    };

    const handleHobbyChange = (selectedOptions) => {
        setHobbies(selectedOptions);
        if (selectedOptions.length === 0) {
            setHobbiesError('At least one hobby must be selected.');
        } else {
            setHobbiesError('');
        }
    };

    const handleGenderChange = (e) => {
        const value = e.target.value;
        setGender(value);
        if (value === '') {
            setGenderError('Gender field is required.');
        } else {
            setGenderError('');
        }
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.put(`https://66cef006901aab24842037e7.mockapi.io/Student/${id}`, {
                name,
                email,
                studentClass,
                hobbies: hobbies.map(hobby => hobby.value),
                gender: capitalizeFirstLetter(gender),
            });

            console.log(' data updated successfully:', response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error updating form data:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate('/read'); // Navigate to the Read page after closing the modal
    };

    const handleOkClick = () => {
        closeModal(); // Close the modal and trigger redirect
    };

    const hobbyOptions = [
        { value: 'Reading', label: 'Reading' },
        { value: 'Gaming', label: 'Gaming' },
        { value: 'Travelling', label: 'Travelling' },
        { value: 'Cooking', label: 'Cooking' },
        { value: 'Badminton', label: 'Badminton' },
        { value: 'Singing', label: 'Singing' },
        { value: 'Writing', label: 'Writing' },
        { value: 'Painting', label: 'Painting' },
        { value: 'Cricket', label: 'Cricket' },
        { value: 'Other', label: 'Other' },
        { value: 'None', label: 'None' }
    ];

    const cancelForm = () => {
        navigate('/read'); // Navigate to the Read page without making changes
    };

    const validateForm = () => {
        let isValid = true;

        if (name.length <= 3 || !name.match(nameRegex)) {
            setNameError('Name must be more than 3 letters and contain only letters.');
            isValid = false;
        } else {
            setNameError('');
        }

        if (!email.match(emailRegex)) {
            setEmailError('Invalid email address.');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (studentClass === '') {
            setStudentClassError('Student class field is required.');
            isValid = false;
        } else {
            setStudentClassError('');
        }

        if (hobbies.length === 0) {
            setHobbiesError('At least one hobby must be selected.');
            isValid = false;
        } else {
            setHobbiesError('');
        }

        if (gender === '') {
            setGenderError('Gender field is required.');
            isValid = false;
        } else {
            setGenderError('');
        }

        return isValid;
    };

    if (!student) {
        return <p>Loading...</p>;
    }

    return (
        <div className="update-form-container">
            <div className="form-wrapper">
                <h2 className="form-heading">Update Student Data</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <Label className="form-label">Name</Label>
                        <input
                            placeholder="Enter student name"
                            type="text"
                            className={`form-input ${nameError ? 'input-error' : ''}`}
                            value={name}
                            onChange={handleNameChange}
                        />
                        {nameError && (
                            <div className="error-message">
                                {nameError}
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <Label className="form-label">Email</Label>
                        <input
                            placeholder="Enter student email"
                            type="text"
                            className={`form-input ${emailError ? 'input-error' : ''}`}
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {emailError && (
                            <div className="error-message">
                                {emailError}
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <Label className="form-label">Student class</Label>
                        <select
                            className={`form-select ${studentClassError ? 'input-error' : ''}`}
                            value={studentClass}
                            onChange={handleStudentClassChange}
                        >
                            <option value="">Select Class</option>
                            <option value="11th">11th</option>
                            <option value="12th">12th</option>
                            <option value="First Year">First Year</option>
                            <option value="Second Year">Second Year</option>
                            <option value="Third Year">Third Year</option>
                            <option value="Last Year">Last Year</option>
                            <option value="other">Other</option>
                        </select>
                        {studentClassError && (
                            <div className="error-message">
                                {studentClassError}
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <Label className="form-label">Hobbies</Label>
                        <Select
                            isMulti
                            options={hobbyOptions}
                            value={hobbies}
                            onChange={handleHobbyChange}
                            className={`form-select ${hobbiesError ? 'input-error' : ''}`}
                        />
                        {hobbiesError && (
                            <div className="error-message">
                                {hobbiesError}
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <Label className="form-label">Gender</Label>
                        <div className="gender-options">
                            <label>
                                <input
                                    type="radio"
                                    value="male"
                                    checked={gender === 'male'}
                                    onChange={handleGenderChange}
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="female"
                                    checked={gender === 'female'}
                                    onChange={handleGenderChange}
                                />
                                Female
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="other"
                                    checked={gender === 'other'}
                                    onChange={handleGenderChange}
                                />
                                Other
                            </label>
                        </div>
                        {genderError && (
                            <div className="error-message">
                                {genderError}
                            </div>
                        )}
                    </div>
                    <div className="form-buttons">
                        <button type="button" className="cancel" onClick={cancelForm}>Cancel</button>
                        <button type="submit" className="submit">Update</button>
                    </div>
                </form>
            </div>
            <Modal
                isOpen={isModalOpen}
                onDismiss={closeModal}
                isBlocking={false}
                containerClassName="update-modal-container"
            >
                <div className="modal-content">
                    <h3>Success!</h3>
                    <p>Student data has been updated successfully.</p>
                    <button className="ok-button" onClick={handleOkClick}>OK</button>
                </div>
            </Modal>
        </div>
    );
};

export default Update;
