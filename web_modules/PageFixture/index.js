import React, { Component, PropTypes } from 'react';
import fetchJSON from "app/fetchJSON";
import consts from "app/consts"
import InputList from "InputList";
import {connect} from "react-redux";
import { get as getFixture } from "app/reducers/fixture";
import {Link, IndexLink} from 'react-router';
import styles from "./index.css";

@connect(
    (state) => ({
        fixture : state.fixture
    }),
    (dispatch) => ({
        getFixture : (value) => dispatch(getFixture(value))
    })
)

export default class PageFixture extends Component {
    static propTypes = {
        params: PropTypes.shape({
          fixtureId:PropTypes.string,
        }),
        fixture : PropTypes.object,
        getFixture : PropTypes.func
    };

    static defaultProps = {
        params: {},
        fixture: null,
        getFixture : () => {}
    };

    state = {
      fixture: null
    };

    componentDidMount(){
        const {
          params,
          getFixture
        } = this.props

        if(params.fixtureId) {
            getFixture(params.fixtureId);
        }
    }

  render(){
      const {
        params,
        fixture
      } = this.props

    return (
      <div>
      {
         fixture &&
         fixture.fixture &&
         fixture.head2head &&
         <div>
            <img width="100%" src="http://www.jaflore.com/img/sdw/fixture.png"/>
            <div className={styles.fixtureResult}>
                {fixture.fixture.homeTeamName} &nbsp;
                {fixture.fixture.result.goalsHomeTeam} - {fixture.fixture.result.goalsAwayTeam} &nbsp;
                {fixture.fixture.awayTeamName}
                <div className={styles.infos}>
                    {fixture.fixture.date}<br/>
                    {fixture.fixture.status}<br/>
                    Journéee : {fixture.fixture.matchday}
                </div>
            </div>
            <h2>Historique des confrontations {fixture.fixture.homeTeamName} / {fixture.fixture.awayTeamName}</h2>
            <hr/>
            <p>
                Nombre de confrontations : {fixture.head2head.count}<br/>
                Première opposition enregistrée : {fixture.head2head.timeFrameStart}<br/>
                Dernière opposition enregistrée : {fixture.head2head.timeFrameEnd}<br/>
                Bilan : <br/>
                {fixture.head2head.homeTeamWins} victoires de {fixture.fixture.homeTeamName}<br/>
                {fixture.head2head.awayTeamWins} victoires de {fixture.fixture.awayTeamName}<br/>
                {fixture.head2head.draws} nuls<br/>
            </p>
        </div>

      }
      </div>
    )
  }
}
