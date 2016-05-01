import fetchJSON from "app/fetchJSON"
import consts from "app/consts"

export const GET = "molotov/teamfixtures/GET"
export const SET = "molotov/teamfixtures/SET"
export const ERROR = "molotov/teamfixtures/ERROR"

const initialState = {
  loading:true
}

const format = (data) => {
    const {teamfixtures} = data
    let result = {teamfixtures}
    return result
}

// redux reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {

    case GET:
        return {
            loading:true
        }

    case SET:
        return {
            ...format(action.response)
        }

    case ERROR:
        /* eslint-disable no-console */
        console.error(ERROR, action.error)
        /* eslint-disable no-console */
        return {
            error: (
                action.error && action.error.data &&
                action.error.data.error && action.error.data.error.user_message
            ) || true
        }

    default:
        return state
    }
}

// redux actions
export function get(id) {
    return {
        types: [
            GET,
            SET,
            ERROR,
        ],
        promise: (
            fetchJSON(consts.api.enpoints.getTeamFixtures(id), {
                method: "GET"
            })
        )
    }
}
