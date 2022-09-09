import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useCallback, useState } from "react";
import { toast } from "react-semantic-toasts";
import { Segment } from "semantic-ui-react";
import ABookForm from "../../components/ABookForm/ABookForm";
import TextBox from "../../components/ABookForm/Components/Editors/TextBox/TextBox";
import GroupItem from "../../components/ABookForm/Components/Items/GroupItem/GroupItem";
import SimpleItem from "../../components/ABookForm/Components/Items/SimpleItem/SimpleItem";
import { firebaseApp } from "../../firebaseApp";
import useUserDispatch from "../../redux/Slices/userSlice";
import useABookHistory from "../../redux/useABookHistory";

export interface ISignupProps {

}

const specialChars = ['+', '-', '!', '#', '$'];

const Signup = (props: ISignupProps) => {

    const auth = getAuth();

    const [formData, setFormData] = useState({});

    const { push } = useABookHistory();

    const { login } = useUserDispatch();

    const handleSubmit = useCallback(async (formData) => {

        try {
            const response = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
            const token = await response.user.getIdToken();
            
            login({ email: response.user.email, token: token });
            push('contacts');

        }
        catch (error) {
            toast({
                title: 'An Error occured',
                color: 'red',
                type: 'error'
            })
        }

    },
        []
    )

    return <div className="login-signup-wrapper">
        <Segment>
            <ABookForm
                onSubmit={({ formData, isValid }) => {

                    if (!isValid) {
                        return;
                    }

                    handleSubmit(formData);
                }}

            >
                <GroupItem
                    colCount={1}
                >
                    <SimpleItem
                        dataField="email"
                        validationRules={[
                            {
                                type: 'required',
                                message: 'Email is required'

                            },
                            {
                                type: 'custom',
                                validationCallback: ({ value }) => {
                                    if (!value)
                                        return false;

                                    const emailValidationRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

                                    return emailValidationRegex.test(value);
                                },
                                message: 'Email is not valid'
                            }
                        ]}
                    >
                        <TextBox label='e-mail'></TextBox>
                    </SimpleItem>
                    <SimpleItem
                        dataField="password"
                        validationRules={[
                            {
                                type: 'required',
                                message: 'Password is required'
                            },
                            {
                                type: 'custom',
                                validationCallback: ({ value }) => {
                                    const MIN_LENGTH = 6;
                                    return value?.length >= MIN_LENGTH
                                },
                                message: 'Password needs to be at least 6 characters long'
                            },
                            {
                                type: 'custom',
                                validationCallback: ({ value }) => {

                                    if (!value) {
                                        return false;

                                    }
                                    for (let char of value.split('')) {
                                        if (specialChars.includes(char)) {
                                            return true;
                                        };
                                    }

                                    return false;
                                },
                                message: 'Password needs to include one of the special chars: ' + specialChars.join(',')
                            }
                        ]}
                    >
                        <TextBox label='password' ></TextBox>
                    </SimpleItem>
                </GroupItem>
            </ABookForm >
        </Segment>

    </div >
}

export default Signup;