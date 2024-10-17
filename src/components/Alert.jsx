import React from 'react';
import '../assets/css/Alert.css';

/**
 * A reusable alert modal component to display error/warning/success messages
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls the visibility of the alert
 * @param {string} props.message - The alert message to display
 * @param {string} props.type - The type of alert ('error', 'warning', 'success')
 * @param {Function} props.onClose - Callback function when user clicks OK
 * @returns {JSX.Element|null}
 */
const Alert = ({ isOpen, message, type = 'error', onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="alert-overlay">
            <div className={`alert-container ${type}`}>
                <h2 className="alert-title">{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
                <p className="alert-message">{message}</p>
                <div className="alert-buttons">
                    <button onClick={onClose} className="alert-ok-button">
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Alert;
