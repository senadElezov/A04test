
import { useSelector } from 'react-redux'
import { IMainState } from '../store';


const useABookSelector = <ReturnType extends any>(selectorFunction: (mainState: IMainState) => ReturnType): ReturnType => {

    const state = useSelector(selectorFunction);

    return state;
}

export default useABookSelector;