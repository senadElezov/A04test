import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { SemanticToastContainer } from "react-semantic-toasts";
import { Button, Icon, Menu } from "semantic-ui-react";
import ABookRouter from "./ABookRouter";
import Login from "./Pages/Auth/Login";
import Signup from "./app/auth/Signup";
import ABookSidebar from "./components/ABookSidebar/ABookSidebar";
import useABookSelector from "./redux/Hooks/useABookSelector";
import useUserDispatch from "./redux/Slices/userSlice";
import useABookHistory from "./redux/useABookHistory";

const AppMainContent = () => {

    const email = useABookSelector(state => state.user.email);

    const { push } = useABookHistory();

    useEffect(() => {
        if (email) {
            return;
        }

        push('login')

    },
        [email]
    )

    const [sideBarOpened, setSideBarOpened] = useState(true);

    const { logout } = useUserDispatch()

    return <div>
        <Menu>
            <Menu.Item
            >
                <Button
                    onClick={() => setSideBarOpened((prev) => !prev)}
                >
                    <Icon
                        name='circle notched'
                    ></Icon>
                </Button>

            </Menu.Item>
            <Menu.Item
                position="right"
            >
                <p>logged in as {email}</p>
            </Menu.Item>
            <Menu.Item
                onClick={() => logout()}
                icon='log out'
            >
                Log out
            </Menu.Item>
        </Menu>
        <ABookSidebar
            visible={sideBarOpened}
        >
            <ABookRouter >
            </ABookRouter>
            <SemanticToastContainer
                position='bottom-right'
            />
        </ABookSidebar>
    </div>
}

export default AppMainContent;