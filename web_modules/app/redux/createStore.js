import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import DevTools from "./createDevTools"

export default function(reducer = {}, initialState = {}) {
    function promiseMiddleware() {
        return (next) => (action) => {
            const { promise, types, ...rest } = action
            if (!promise) {
                const type = action.types ? action.types[0] : null
                return next({ ...rest, type: type })
            }
      else if (!promise.then) {
          throw new Error(
          "promiseMiddleware expects a promise object that implements then()"
        )
      }

            const [ REQUEST, SUCCESS, FAILURE ] = types
            next({ ...rest, type: REQUEST })
            return promise.then(
                (response) => next({ ...rest, response, type: SUCCESS }),
                (error) => {
                      next({ ...rest, ...error, type: FAILURE })
                      return error;
                })
        }
    }

    let finalCreateStore

    if (__DEVTOOLS__) {
        const { persistState } = require("redux-devtools")

        finalCreateStore = compose(
      applyMiddleware(promiseMiddleware, thunk),
      DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore)
    }
  else {
        finalCreateStore = applyMiddleware(promiseMiddleware, thunk)(createStore)
    }

    return finalCreateStore(reducer, initialState)
}
