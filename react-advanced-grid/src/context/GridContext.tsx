import { createContext } from 'react';

const GridContext = createContext({});

type GridContextType = {
    ITEM_SIZE: number;
};

export default GridContext;

export const GridProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const ITEM_SIZE = 40;
    // const [gridData, setGridData] = useState<string[][]>(createInitialData(effectiveRows, effectiveColumns));
    return <GridContext value={{
        ITEM_SIZE
    } as GridContextType}>{children}</GridContext>;
};