import useLockBodyScroll from 'libs/useLockBodyScroll';
import { useRef, useEffect, useState } from "react";
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const StyledModalWrap = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    background: rgba(150,150,150,0.5);
`

const ModalWrap = ({children}) => {
    useLockBodyScroll();
    return(
    <StyledModalWrap className="modalWrap">
        {children}
    </StyledModalWrap>);
}

export const ModalPotal = ({ children, open }) => {
    if(!open) return null;
    const ref = useRef(null);
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        ref.current = document.getElementById('modal');
        setMounted(true);
    }, []);

    console.log(ref.current);

    return ref.current !== null ? createPortal(<ModalWrap children={children} />, ref.current) : null;
}

// export const ModalPotal = ({ children, open }) => {
//     if(!open) return null;
//     const el = document.getElementById('modal');
//     return createPortal(<ModalWrap children={children} />, el);
// }

export default function Modal(){
    return(<div id="modal" />);
}