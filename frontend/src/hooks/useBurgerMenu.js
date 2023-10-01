import { useEffect, useRef, useState } from 'react';

const useBurgerMenu = () => {

    const [expanded, setExpanded] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleBurgerMenu = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setExpanded(false);
            }
        };

        document.addEventListener("mouseup", handleBurgerMenu);
        return () => {
            document.removeEventListener("mouseup", handleBurgerMenu);
        };
    }, [ref]);

    return {expanded, setExpanded, ref};

};

export default useBurgerMenu;