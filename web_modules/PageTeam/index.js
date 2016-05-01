import React, { Component, PropTypes } from 'react';
import fetchJSON from "app/fetchJSON";
import consts from "app/consts"
import InputList from "InputList";
import {connect} from "react-redux";
import { get as getTeam } from "app/reducers/team";
import { get as getPlayers } from "app/reducers/players";
import { get as getTeamFixtures } from "app/reducers/teamfixtures";
import {Link, IndexLink} from 'react-router';
import styles from "./index.css";

@connect(
    (state) => ({
        team : state.team,
        players : state.players,
        teamfixtures : state.teamfixtures
    }),
    (dispatch) => ({
        getTeam : (value) => dispatch(getTeam(value)),
        getPlayers : (value) => dispatch(getPlayers(value)),
        getTeamFixtures : (value) => dispatch(getTeamFixtures(value))
    })
)

export default class PageTeam extends Component {
    static propTypes = {
        params: PropTypes.shape({
          teamId:PropTypes.string,
        }),
        team : PropTypes.object,
        players : PropTypes.object,
        teamfixtures : PropTypes.object,
        getTeam : PropTypes.func,
        getPlayers : PropTypes.func,
        getTeamFixtures : PropTypes.func
    };

    static defaultProps = {
        params: {},
        team: null,
        players:null,
        teamfixtures:null,
        getTeam : () => {},
        getPlayers : () => {},
        getTeamFixtures : () => {}
    };

    state = {
      team: null,
      players:null,
      teamfixtures:null
    };

    componentDidMount(){
        const {
          params,
          getTeam,
          getPlayers,
          getTeamFixtures
        } = this.props

        if(params.teamId) {
            getTeam(params.teamId);
            getPlayers(params.teamId);
            getTeamFixtures(params.teamId);
        }
    }

  render(){
      const {
        params,
        team,
        players,
        teamfixtures
      } = this.props

    return (
      <div>
      {
          team &&
              <div>
                <h1 className={styles.title}>
                    <img className={styles.logoTeam} width="100px" src={team.crestUrl}/>
                    {team.name}
                </h1>
                <div className={styles.resultats}>
                {
                    teamfixtures &&
                    teamfixtures.fixtures &&
                    teamfixtures.fixtures.map((fixture, index) => {
                        if(fixture.result.goalsHomeTeam!==null && fixture.result.goalsAwayTeam!==null){
                            return <div key={index} className={styles.fixture} >
                                        <div className={styles.homeTeams}>{fixture.homeTeamName}</div>
                                        <div className={styles.scores}>{fixture.result.goalsHomeTeam} - {fixture.result.goalsAwayTeam}</div>
                                        <div className={styles.awayTeams}> {fixture.awayTeamName}</div>
                                    </div>
                        }
                    })
                }
                </div>
                <div className={styles.listPlayers}>
                    <h3>Joueurs</h3>
                    <ul>
                      {
                        players &&
                        players.players &&
                        players.players.map((player, index) => {
                            var fullname = player.name;
                            var flocage = fullname.substr(fullname.indexOf(' ')+1);
                          return <li className={styles.player} key={index}>
                                    <img className={styles.maillot} src="http://www.jaflore.com/img/sdw/maillot.jpg"/>
                                    <span className={styles.flocage}>{flocage}</span>
                                    <span className={styles.numero}>{player.jerseyNumber}</span>
                                    <h3>{player.name}</h3>
                                    <hr/>
                                    <button id={index}>Infos</button>
                                    <div className={styles.infosPlayer}>
                                        Position : {player.position}<br/>
                                        Année de naissance : {player.dateOfBirth}<br/>
                                        Nationalité : {player.nationality}<br/>
                                        Fin du contrat : {player.contractUntil}<br/>
                                        Valuer : {player.marketValue}<br/>
                                    </div>

                                </li>
                        })
                      }
                    </ul>
                </div>
            </div>
      }
      </div>
    )
  }
}
