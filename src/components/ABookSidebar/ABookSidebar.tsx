import { useState } from "react"
import {
    Sidebar,
    SidebarProps,
    Segment,
    Menu,
    Icon,
    Button
} from "semantic-ui-react"
import useABookHistory from "../../redux/useABookHistory"
import { routeDefinitions, RoutesModel } from "../../routes"

export interface ISidebarProps extends SidebarProps {

    visible?: boolean

    onLocationChanged?: ({ location: string }) => any
}

const ABookSidebar = (props: ISidebarProps) => {

    const { push } = useABookHistory();

    return <div
        style={{
            minHeight: '100%',
            height: 'auto !important',

        }}>
        <Sidebar.Pushable
            as={Segment}>
            <Sidebar
                as={Menu}
                animation='scale down'
                icon='labeled'
                inverted
                vertical
                visible={props.visible}
                width='thin'
            >
                {Object.entries(routeDefinitions)
                    .filter(([route, { showInSidebar }]) => showInSidebar)
                    .map(([route, { display,icon }]) => {
                        return <Menu.Item
                            icon={icon}
                            onClick={() => {
                                push(route as keyof RoutesModel)
                            }}
                        >{display}</Menu.Item>
                    })}
            </Sidebar>

            <Sidebar.Pusher>
                <div style={{
                    minHeight: '500px'
                }}>
                    <Segment basic size="big" >

                        {props.children}
                    </Segment>

                </div>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    </div>
}

export default ABookSidebar