import { useNavigate, useHref } from 'react-router-dom'
import { RoutesModel } from '../routes';
const useABookHistory = () => {

    const navigate = useNavigate();

    return {
        push: <Route extends keyof RoutesModel>(route: Route, params?: RoutesModel[Route]) => {

            const paramsString = params && '/' + Object.values(params).join('/')
            navigate({
                pathname: '/'+route + (paramsString || ''),

            });
        }
    }
}

export default useABookHistory;