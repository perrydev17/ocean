import { getInitialData } from '../utils/api';
import { receiveUsers } from '../actions/users';
import { receivePolls } from '../actions/polls';
import { setAuthedUser } from '../actions/authedUser';

const AUTHED_ID = 'sarah_edo';

export function handleInitialData () {
    return (dispatch) => {
        return getInitialData()
            .then(({users, polls}) => {
                dispatch(receiveUsers(users));
                dispatch(receiveUsers(polls));
                dispatch(setAuthedUser(AUTHED_ID));
            })
    }
}