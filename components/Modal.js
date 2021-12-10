import { createPortal } from 'react-dom';

export const ModalPotal = ({ children, open }) => {
    if(!open) return null;
    const el = document.getElementById('modal');
    return createPortal(children, el);
}

export default function Modal(){
    return(<div id="modal" />);
}