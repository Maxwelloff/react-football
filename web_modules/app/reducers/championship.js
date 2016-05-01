import fetchJSON from "app/fetchJSON"
import consts from "app/consts"

export const GET = "molotov/championship/GET"
export const SET = "molotov/championship/SET"
export const ERROR = "molotov/championship/ERROR"

const initialState = {
  loading:true
}

const format = (data) => {
    const {id, caption, year, _links,currentMatchday} = data
    let result = {id, caption,_links, year,currentMatchday}
    //if(images && images.length>2) result.picture = images[3]
    if(_links){
        result.teams = _links.teams.href;
        result.fixtures = _links.fixtures.href;
        result.leagueTable = _links.leagueTable.href;
    }
    //result.currentMatchday = currentMatchday;
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
            fetchJSON(consts.api.enpoints.getChampionship(id), {
                method: "GET"
            })
        )
    }
}
