import { useCallback, useState } from 'react';

const useToggle = (initialState = false) => {
    const [ isToggle, setIsToggle ] = useState(initialState);
    const toggle = useCallback(() => setIsToggle(t => !t), []);
    return [isToggle, toggle]
}
export default useToggle;