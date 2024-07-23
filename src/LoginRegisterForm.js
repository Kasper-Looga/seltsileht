/ App.js
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formType, setFormType] = useState('login');

  const toggleForm = () => setIsFormOpen(!isFormOpen);

  const switchToLogin = () => setFormType('login');
  const switchToRegister = () => setFormType('register');

  return (
    <div className="App">
      <button onClick={toggleForm} className="open-form-button">
        Open Form
      </button>
     
      {isFormOpen && (
        <div className="form-container">
          <div className="form-header">
            <button
              className={`form-toggle-button ${formType === 'login' ? 'active' : ''}`}
              onClick={switchToLogin}
            >
              Login
            </button>
            <button
              className={`form-toggle-button ${formType === 'register' ? 'active' : ''}`}
              onClick={switchToRegister}
            >
              Register
            </button>
          </div>
          <div className="form-content">
            {formType === 'login' ? (
              <LoginForm />
            ) : (
              <RegisterForm />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const LoginForm = () => (
  <div>
    <h2>Login Form</h2>
    {/* Add your login form fields here */}
  </div>
);

const RegisterForm = () => (
  <div>
    <h2>Register Form</h2>
    {/* Add your register form fields here */}
  </div>
);

export default App;

// App.css
.App {
  text-align: center;
}

.open-form-button {
  margin: 20px;
  padding: 10px 20px;
  font-size: 16px;
}

.form-container {
  border: 1px solid #ccc;
  padding: 20px;
  width: 300px;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.form-header {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.form-toggle-button {
  padding: 10px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  transition: color 0.3s ease, background-color 0.3s ease;
}

.form-toggle-button.active {
  color: white;
  background-color: #007bff;
}

.form-content {
  transition: all 0.3s ease;
}