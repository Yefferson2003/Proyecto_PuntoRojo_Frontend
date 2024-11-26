import  { useState, useEffect } from 'react';

export const useIsMovile = () => {
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(window.innerWidth > 400);

    useEffect(() => {
        const handleResize = () => {
        setIsLargeScreen(window.innerWidth > 1024);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isLargeScreen;
};

