import React from "react";
import { IndexRouteProps, useLocation, useMatch, useParams } from "react-router";
import { Segment } from "semantic-ui-react";

export interface IPageBaseProps {

    RootChildComponent?: React.FC<any>

    children: any
}

const PageBase = (props: IPageBaseProps) => {

    const { RootChildComponent } = props;

    const params = useParams();

    return <Segment
        size="big"
    >
        <>
            <RootChildComponent
                {...props}
            ></RootChildComponent>
            {props.children}
        </>
    </Segment>
}

export default PageBase;