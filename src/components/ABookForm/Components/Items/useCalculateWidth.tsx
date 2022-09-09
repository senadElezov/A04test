import { useContext, useEffect, useState } from "react";
import { SemanticWIDTHS } from "semantic-ui-react";
import { GroupItemCtx } from "./GroupItem/ContextProviders/GroupItemCtxProvider";


const useCalculateWidth = (colSpan: number) => {
    const groupItemCtx = useContext(GroupItemCtx);
    const parentColCount = groupItemCtx.colCount || 1;

    const getWidth = () => {
        const calculatedWidth = ((colSpan || 1) / parentColCount * 16);

        return calculatedWidth > 16 ? 16 : calculatedWidth as SemanticWIDTHS;
    }

    const [calculatedWidth, setCalculatedWidth] = useState<SemanticWIDTHS>(() => getWidth());



    useEffect(() => {
        setCalculatedWidth(() => getWidth())
    },
        [colSpan, parentColCount]
    )

    return {
        calculatedWidth
    }
}

export default useCalculateWidth;