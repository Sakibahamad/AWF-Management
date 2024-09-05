import React, { useState } from 'react';
import { TextField, PrimaryButton, Link, IconButton } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [userRegistration, setUserRegistration] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleInput = (e, newValue) => {
        const name = e.target.name;
        setUserRegistration({ ...userRegistration, [name]: newValue });
        setErrors({ ...errors, [name]: '' });
    };

    const validate = () => {
        let isValid = true;
        const newErrors = { username: '', email: '', password: '' };

        if (!userRegistration.username) {
            newErrors.username = 'Username is required';
            isValid = false;
        } else if (userRegistration.username !== 'Sakib@2004') {
            newErrors.username = 'Invalid username';
            isValid = false;
        }

        if (!userRegistration.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(userRegistration.email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        } else if (userRegistration.email !== 'ahamadsakib491@gmail.com') {
            newErrors.email = 'Invalid email';
            isValid = false;
        }

        if (!userRegistration.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (userRegistration.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
            isValid = false;
        } else if (userRegistration.password !== 'Sakib@123') {
            newErrors.password = 'Invalid password';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitted(true);
            navigate('/homepage'); // Navigate to Homepage1 after successful login
        } else {
            setIsSubmitted(false);
        }
    };

    const handleCancel = () => {
        setUserRegistration({
            username: '',
            email: '',
            password: ''
        });
        setErrors({
            username: '',
            email: '',
            password: ''
        });
        setIsSubmitted(false);
    };

    return (
        <div className="form-container">
            <div className="form-header">
                <h4>Login</h4>
                <IconButton
                    iconProps={{ iconName: 'Cancel' }}
                    title="Clear"
                    ariaLabel="Clear"
                    onClick={handleCancel}
                    className="clear-icon"
                />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <TextField
                        label={<span>Username <span style={{ color: 'red' }}>*</span></span>}
                        placeholder="Username"
                        value={userRegistration.username}
                        onChange={(e, newValue) => handleInput(e, newValue)}
                        name="username"
                        errorMessage={errors.username}
                    />
                </div>

                <div className="form-field">
                    <TextField
                        label={<span>Email <span style={{ color: 'red' }}>*</span></span>}
                        placeholder="Email"
                        type="email"
                        value={userRegistration.email}
                        onChange={(e, newValue) => handleInput(e, newValue)}
                        name="email"
                        errorMessage={errors.email}
                    />
                </div>

                <div className="form-field">
                    <TextField
                        label={<span>Password <span style={{ color: 'red' }}>*</span></span>}
                        placeholder="Password"
                        type="password"
                        value={userRegistration.password}
                        onChange={(e, newValue) => handleInput(e, newValue)}
                        name="password"
                        errorMessage={errors.password}
                    />
                </div>

                <div className="button-container">
                    <PrimaryButton type="submit" className="submit-button">Login</PrimaryButton>
                </div>
            </form>
            <div className="forgot-password-container">
                <Link onClick={() => navigate('/forgot-password')} className="forgot-password-link">Forgot Password?</Link>
            </div>
            {isSubmitted && <p className="success-message">Login successful</p>}
        </div>
    );
}

export default Login;
