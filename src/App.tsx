
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Route, Router, Routes } from 'react-router';
import Login from './Pages/Auth/Login';
import AppMainContent from './AppMainContent';

import { store } from './redux/store';

import { firebaseApp } from './firebaseApp';
import { routeDefinitions } from './routes';
import { pageRoutes } from './Pages/pageRoutes';

const App = () => {

    useEffect(() => {
        console.log(firebaseApp);
    })

    return <Provider store={store}>
        <Routes
        >
            {
                Object.entries(routeDefinitions)
                    .filter(([routeName, { useInRoot }]) => useInRoot)
                    .map(([routeName, { route }]) => {
                        const Component = pageRoutes[routeName]
                        return <Route key={routeName} path={route} element={<Component></Component>}></Route>
                    })
            }
            <Route path='*' element={<AppMainContent></AppMainContent>}></Route>
        </Routes>
    </Provider >
}

export default App