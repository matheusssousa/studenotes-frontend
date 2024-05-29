import { useState } from 'react';

const useViewMode = () => {
    const storedViewMode = localStorage.getItem('viewMode');
    const [viewMode, setViewModeState] = useState(storedViewMode || 'card' );

    const setViewMode = (mode) => {
        localStorage.setItem('viewMode', mode);
        setViewModeState(mode);
    };

    return [viewMode, setViewMode];
};

export default useViewMode;