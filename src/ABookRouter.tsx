import { Routes, Route, Router } from "react-router"
import { BrowserRouter } from "react-router-dom"
import PageBase from "./components/PageBase/PageBase"
import { pageRoutes } from "./Pages/pageRoutes"
import { routeDefinitions } from "./routes"

const ABookRouter = (props) => {

    return <Routes >
        {
            Object
                .entries(routeDefinitions)
                .filter(([routeName, { showInSidebar }]) => showInSidebar)
                .map(([routeName, { display, route }]) => {
                    return <Route
                        path={route}
                        key={routeName}
                        element={<PageBase
                            RootChildComponent={pageRoutes[routeName]}
                        >
                        </PageBase>
                        }
                    ></Route>

                })

        }
        {
            props.children
        }
    </Routes >
}

export default ABookRouter