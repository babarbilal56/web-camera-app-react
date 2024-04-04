import React, { useState } from 'react'


import './Header.css';
import Modal from 'react-modal'; // Assuming you're using react-modal library

const Footer = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(!isOpen);
    };

    const closeModal = () => {
        setIsOpen(false);
    };


    return (
        <div className='footer'>
            <footer>

                <button className="option-button mx-2" id="recordButton" onClick={openModal}>Camera Options</button>
            </footer>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                className="side-modal"
                overlayClassName="side-modal-overlay"
            >
                <h2>Side Modal Content</h2>
                <button onClick={closeModal}>Close Modal</button>
            </Modal>
        </div>
    );
};

export default Footer;