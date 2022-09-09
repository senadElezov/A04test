import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { isValidElement, useState } from "react";
import { Button, Segment } from "semantic-ui-react";
import ABookForm from "../../components/ABookForm/ABookForm";
import TextBox from "../../components/ABookForm/Components/Editors/TextBox/TextBox";
import GroupItem from "../../components/ABookForm/Components/Items/GroupItem/GroupItem";
import SimpleItem from "../../components/ABookForm/Components/Items/SimpleItem/SimpleItem";

import useUserDispatch from "../../redux/Slices/userSlice";
import useABookHistory from "../../redux/useABookHistory";

const Login = (props) => {
    const auth = getAuth();

    const { push } = useABookHistory();
    const { login } = useUserDispatch();

    const handleSubmit = async (formData: any) => {
        const response = await signInWithEmailAndPassword(auth, formData.email, formData.password);

        login({
            email: response.user.email,
            token: await response.user.getIdToken(),
            auth: auth
        })

        push('contacts')
    }

    return <div
        className="login-signup-wrapper"

    ><Segment
    ><ABookForm
        onSubmit={({ formData,isValid }) => {
            if(!isValid) {
                return;
            }
            
            handleSubmit(formData);
        }}
        submitText='Login'
        toolbarRender={() => {
            return <Button
                floated="right"
                onClick={() => {
                    push('signup');
                }}
            >Sign up</Button>
        }}

    >
                <GroupItem
                    colCount={1}
                >
                    <SimpleItem
                        colSpan={1}
                        dataField="email"
                        validationRules={[
                            {
                                type: 'required',
                                message: 'Email is required'
                            }
                        ]}
                    >
                        <TextBox required label="E-mail" focusOnLoad></TextBox>
                    </SimpleItem>
                    <SimpleItem
                        colSpan={1}
                        dataField="password"
                        validationRules={[
                            {
                                type: 'required',
                                message: 'Password is required'
                            }
                        ]}
                    >
                        <TextBox required label='Password'></TextBox>
                    </SimpleItem>
                </GroupItem>
            </ABookForm>
        </Segment>
    </div>
}

export default Login;