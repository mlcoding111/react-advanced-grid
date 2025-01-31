import { createContext } from 'react';

const GridContext = createContext({});

export default GridContext;

export const GridProvider = ({ children }: { children: React.ReactNode }) => {
    // const [gridData, setGridData] = useState<string[][]>(createInitialData(effectiveRows, effectiveColumns));
    return <GridContext value={{}}>{children}</GridContext>;
};