import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ children, open, onClose, className = '' }) => {
    const dialog = useRef();
    useEffect(() => {
        const modal = dialog.current;
        if (open) {
            modal.showModal();
        }
        return () => {
            modal.close();
        }
    }, [open]);
    return createPortal(
        <dialog className={`modal ${className}`} ref={dialog} onClose={onClose}>
            {children}
        </dialog>,
        document.getElementById('modal')
    );
};

export default Modal
