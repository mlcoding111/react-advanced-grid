import { use } from 'react';
import GridContext from '../context/GridContext';

export const useGrid = () => {
    const context = use(GridContext);

    if(typeof context === 'undefined') {
        throw new Error('useGrid must be used within a GridProvider');
    }

    return context;
};
