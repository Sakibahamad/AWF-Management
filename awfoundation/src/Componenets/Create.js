import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@fluentui/react/lib/Modal';
import Select from 'react-select';
import { Label } from '@fluentui/react/lib/Label';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import './Create.css';

initializeIcons();

const Create = ({ handlePageChange }) => {
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
            const response = await axios.post('https://66cef006901aab24842037e7.mockapi.io/Student', {
                name,
                email,
                studentClass,
                hobbies: hobbies.map(hobby => hobby.value),
                gender: capitalizeFirstLetter(gender),
            });

            console.log('Form data submitted successfully:', response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        handlePageChange('Read'); // Navigate to the Read page after submission
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
        handlePageChange('Read');
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

    return (
        <div className="create-student-form-container">
            <div className="create-student-form-wrapper">
                <h2 className="create-student-form-heading">Add Student Data</h2>
                <form onSubmit={handleSubmit}>
                    <div className="create-student-form-group">
                        <Label className="create-student-form-label">Name</Label>
                        <input
                            placeholder="Enter student name"
                            type="text"
                            className={`create-student-form-input ${nameError ? 'input-error' : ''}`}
                            value={name}
                            onChange={handleNameChange}
                        />
                        {nameError && (
                            <div className="create-student-form-error-message">
                                {nameError}
                            </div>
                        )}
                    </div>
                    <div className="create-student-form-group">
                        <Label className="create-student-form-label">Email</Label>
                        <input
                            placeholder="Enter student email"
                            type="text"
                            className={`create-student-form-input ${emailError ? 'input-error' : ''}`}
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {emailError && (
                            <div className="create-student-form-error-message">
                                {emailError}
                            </div>
                        )}
                    </div>
                    <div className="create-student-form-group">
                        <Label className="create-student-form-label">Student class</Label>
                        <select
                            className={`create-student-form-select ${studentClassError ? 'input-error' : ''}`}
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
                            <div className="create-student-form-error-message">
                                {studentClassError}
                            </div>
                        )}
                    </div>
                    <div className="create-student-form-group">
                        <Label className="create-student-form-label">Hobbies</Label>
                        <Select
                            isMulti
                            name="hobbies"
                            options={hobbyOptions}
                            className={`create-student-form-select-input ${hobbiesError ? 'input-error' : ''}`}
                            classNamePrefix="select"
                            value={hobbies}
                            onChange={handleHobbyChange}
                        />
                        {hobbiesError && (
                            <div className="create-student-form-error-message">
                                {hobbiesError}
                            </div>
                        )}
                    </div>
                    <div className="create-student-form-group">
                        <Label className="create-student-form-label">Gender</Label>
                        <div className="create-student-form-radio-group">
                            <input
                                className="create-student-form-radio-input"
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                onChange={handleGenderChange}
                                checked={gender === 'male'}
                            />
                            <Label className="create-student-form-radio-label" htmlFor="male">Male</Label>
                            <input
                                className="create-student-form-radio-input"
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                onChange={handleGenderChange}
                                checked={gender === 'female'}
                            />
                            <Label className="create-student-form-radio-label" htmlFor="female">Female</Label>
                        </div>
                        {genderError && (
                            <div className="create-student-form-error-message">
                                {genderError}
                            </div>
                        )}
                    </div>
                    <div className="create-student-form-buttons">
                       
                        <button
                            type="button"
                            className="create-student-form-cancel-button"
                            onClick={cancelForm}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="create-student-form-submit-button"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <Modal
                isOpen={isModalOpen}
                onDismiss={closeModal}
                isBlocking={false}
                className="create-student-form-modal"
            >
                <div className="create-student-form-modal-content">
                    <h3 className="create-student-form-modal-title">Submission Successful</h3>
                    <p className="create-student-form-modal-message">The student data has been added successfully!</p>
                    <button
                        className="create-student-form-modal-close-button"
                        onClick={closeModal}
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Create;
