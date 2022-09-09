import React from "react";
import Login from "./Auth/Login";

import { RoutesModel } from "../routes";
import Contact from "./Contact/Contact";
import Contacts from "./Contact/Contacts";
import ContactType from "./ContactType";
import ContactTypes from "./ContactTypes";
import Signup from "./Auth/Signup";


export const pageRoutes: { [Route in keyof RoutesModel]: React.FC<any> } = {
    "contact/details": Contact,
    "contactType": ContactTypes,
    "contactType/details": ContactType,
    contacts: Contacts,
    login: Login,
    signup:Signup,
}