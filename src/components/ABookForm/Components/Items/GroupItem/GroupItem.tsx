import { useCallback, useContext, useEffect, useState } from "react"
import { Grid, SemanticWIDTHS } from "semantic-ui-react"
import GroupItemCtxProvider, { GroupItemCtx } from "./ContextProviders/GroupItemCtxProvider"

export type ScreenSize = 's' | 'm' | 'l' | 'xl'

const maxScreenSizes: { [Size in ScreenSize]: number } = {
    l: 600,
    m: 992,
    s: 1200,
    xl: Number.POSITIVE_INFINITY
}

export interface IGroupItemProps {

    colSpan?: number

    colCount?: number

    colCountByScreenSize?: { [key in ScreenSize]?: number }

    children?: any
}


const DEFAULT_COL_COUNT = 3;

const GroupItem = (props: IGroupItemProps) => {

    const { colCount, colCountByScreenSize, colSpan } = props;

    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    const groupItemCtx = useContext(GroupItemCtx);

    const handleResize = useCallback(() => {
        const currentWidth = window.innerWidth;

        setWindowWidth(currentWidth);
    },
        []
    )

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    })


    const getArrayedScreenSizes = () => {

        if (!colCountByScreenSize) {
            return;
        }

        const returningArray = Object.entries(colCountByScreenSize)
            .map(([screenSizeIdentifier, colCount]) => {

                const width = maxScreenSizes[screenSizeIdentifier];

                return {
                    screenSizeIdentifier,
                    colCount,
                    width
                }
            })
            .sort((first, second) => first.width - second.width)

        return returningArray;
    };

    const [arrayedScreenSizes] = useState(getArrayedScreenSizes())

    const getColCount = (params: IGroupItemProps) => {

        const { colCount, colCountByScreenSize } = params;

        if (colCount) {
            return colCount
        }

        if (!colCountByScreenSize) {
            return DEFAULT_COL_COUNT
        }


        for (const { width: maxWidth, colCount } of arrayedScreenSizes) {

            if (windowWidth < maxWidth) {
                return colCount;
            }
        }

    }

    const [calculatedColCount, setCalculatedColCount] = useState<number>(getColCount(props))


    useEffect(() => {

        if (!colCountByScreenSize) {
            return;
        }

        setCalculatedColCount(() => getColCount(props))
    },
        [colCountByScreenSize, windowWidth]
    );

    return <Grid.Column width={colSpan as SemanticWIDTHS}>
        <Grid
            columns={colCount as SemanticWIDTHS}
        >
            <GroupItemCtxProvider colCount={props.colCount}>
                <Grid.Row
                    columns={calculatedColCount as SemanticWIDTHS}
                >
                    {props.children}
                </Grid.Row>
            </GroupItemCtxProvider>
        </Grid>
    </Grid.Column>
}

export default GroupItem;
