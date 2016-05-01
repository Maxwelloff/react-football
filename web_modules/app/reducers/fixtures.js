import fetchJSON from "app/fetchJSON"
import consts from "app/consts"

export const GET = "molotov/fixtures/GET"
export const SET = "molotov/fixtures/SET"
export const ERROR = "molotov/fixtures/ERROR"

const initialState = {
  loading:true
}

const format = (data) => {
    const {fixtures} = data
    let result = {fixtures}
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
            fetchJSON(consts.api.enpoints.getFixtures(id), {
                method: "GET"
            })
        )
    }
}
