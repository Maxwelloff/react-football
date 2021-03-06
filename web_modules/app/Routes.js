import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

window.__DEVTOOLS__ = !(process.env.NODE_ENV === 'production');
import { combineReducers } from "redux"
import { Provider } from "react-redux"
import createStore from "app/redux/createStore"
import * as reducers from "app/reducers"
const store = createStore(combineReducers(reducers))

import App from "./App"
import PageHome from "PageHome"
import PageNotFound from "PageNotFound"
import PageChampionship from "PageChampionship"
import PageTeam from "PageTeam"
import PageFixture from "PageFixture"

import DevTools from "app/redux/createDevTools"

let devtools = null
if (__DEVTOOLS__) {
    devtools = (
      <DevTools store={store}/>
    )
}

export default class Routes extends Component {

  render() {
    return (
      <div>
       <Provider store={ store }>
          <Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route path="championship/:championshipId" component={PageChampionship}/>
                <Route path="teams/:teamId" component={PageTeam}/>
                <Route path="fixtures/:fixtureId" component={PageFixture}/>
                <IndexRoute component={PageHome} />
            </Route>
            <Route path="*" component={PageNotFound}/>
          </Router>
        </Provider>
        { __DEVTOOLS__ && devtools }
      </div>
    )
  }
}
