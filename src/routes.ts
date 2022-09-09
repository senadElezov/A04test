
/**todo put on backend */

import { IconProps } from "semantic-ui-react"

export type RoutesModel = {
    contacts: never
    "contact/details": {
        ID: string
    },
    contactType: never,
    "contactType/details": {
        ID: string
    },
    login: never,
    signup: never
}

export const routeDefinitions: { [Route in keyof RoutesModel]: {
    display: string,
    route: string,
    showInSidebar?: boolean,
    icon?: IconProps['name'],
    useInRoot?: boolean,
} } = {
    'contacts': {
        display: 'Contacts',
        route: '/contacts',
        showInSidebar: true,
        icon: 'home'
    },
    "contactType": {
        display: 'Contact type',
        route: '/contactType'
    },
    "contact/details": {
        display: 'Contact details',
        route: '/contact/details/:id'
    },
    "contactType/details": {
        display: 'Contact type details',
        route: '/contactType/details/:id'
    },
    login: {
        display: 'Login',
        route: '/login',
        useInRoot: true
    },
    signup: {
        display: 'Sign up',
        route: '/signup',
        useInRoot: true
    }


}