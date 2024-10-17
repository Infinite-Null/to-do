import React from 'react';
import '../assets/css/ConfirmBox.css';

/**
 * A reusable confirmation modal component
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls the visibility of the modal
 * @param {string} props.message - The confirmation message to display
 * @param {Function} props.onConfirm - Callback function when user confirms
 * @param {Function} props.onCancel - Callback function when user cancels
 * @returns {JSX.Element|null}
 */
const ConfirmBox = ({ isOpen, message, onConfirm, onCancel }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="confirm-box-overlay">
            <div className="confirm-box-container">
                <h2 className="confirm-box-title">Confirm Action</h2>
                <p className="confirm-box-message">{message}</p>
                <div className="confirm-box-buttons">
                    <button onClick={onCancel} className="confirm-box-cancel-button">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="confirm-box-confirm-button">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmBox;
