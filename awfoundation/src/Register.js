import React, { useState } from 'react';
import { TextField, PrimaryButton } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; 

function Register() {
    const [userRegistration, setUserRegistration] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInput = (e, newValue) => {
        const name = e.target.name;
        setUserRegistration({ ...userRegistration, [name]: newValue });
        setErrors({ ...errors, [name]: '' });
    };

    const validate = () => {
        let isValid = true;
        const newErrors = {};

        if (!userRegistration.username) {
            newErrors.username = 'Username is required';
            isValid = false;
        }

        if (!userRegistration.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(userRegistration.email)) {
            newErrors.email = 'Email is invalid';
            isValid = false;
        }

        if (!userRegistration.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (userRegistration.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        if (!userRegistration.confirmPassword) {
            newErrors.confirmPassword = 'Confirm Password is required';
            isValid = false;
        } else if (userRegistration.password !== userRegistration.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitted(true);
            navigate('/login'); // Redirect to login page after successful registration
        } else {
            setIsSubmitted(false);
        }
    };

    return (
        <div className="form-container">
            <h4>Register</h4>
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

                <div className="form-field">
                    <TextField
                        label={<span>Confirm Password <span style={{ color: 'red' }}>*</span></span>}
                        placeholder="Confirm Password"
                        type="password"
                        value={userRegistration.confirmPassword}
                        onChange={(e, newValue) => handleInput(e, newValue)}
                        name="confirmPassword"
                        errorMessage={errors.confirmPassword}
                    />
                </div>

                <div className="button-container">
                    <PrimaryButton type="submit" className="submit-button">Register</PrimaryButton>
                    <PrimaryButton onClick={() => navigate('/login')} className="login-button">Login</PrimaryButton>
                </div>
            </form>
            {isSubmitted && <p className="success-message">Registration successful</p>}
        </div>
    );
}

export default Register;
