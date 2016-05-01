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
                <h3 className={styles.titleClassement}>Résultats</h3>
                <hr/>
                {
                    teamfixtures &&
                    teamfixtures.fixtures &&
                    teamfixtures.fixtures.map((fixture, index) => {
                        if(fixture.result.goalsHomeTeam!==null && fixture.result.goalsAwayTeam!==null){
                            fixture.id = fixture._links.self.href.substr(41);
                            return <div key={index} className={styles.fixture} >
                                        <Link to={"/fixtures/"+fixture.id}>
                                            <div className={styles.homeTeams}>{fixture.homeTeamName}</div>
                                            <div className={styles.scores}>{fixture.result.goalsHomeTeam} - {fixture.result.goalsAwayTeam}</div>
                                            <div className={styles.awayTeams}> {fixture.awayTeamName}</div>
                                        </Link>
                                    </div>
                        }
                    })
                }
                </div>
                <div className={styles.listPlayers}>
                    <h3>Joueurs</h3>
                    <hr/>
                    <ul>
                      {
                        players &&
                        players.players &&
                        players.players.map((player, index) => {
                            var fullname = player.name;
                            var flocage = fullname.substr(fullname.indexOf(' ')+1);
                          return <li className={styles.player} key={index}>
                                    <h3>{player.name}</h3>
                                    <div className={styles.left}>
                                        <img className={styles.maillot} src="http://www.jaflore.com/img/sdw/maillot.jpg"/>
                                        <span className={styles.flocage}>{flocage}</span>
                                        <span className={styles.numero}>{player.jerseyNumber}</span>
                                    </div>
                                    <div className={styles.infosPlayer}>
                                        Position : {player.position}<br/><br/>
                                        Année de naissance : {player.dateOfBirth}<br/><br/>
                                        Nationalité : {player.nationality}<br/><br/>
                                        Fin du contrat : {player.contractUntil}<br/><br/>
                                        Valeur : {player.marketValue}<br/>
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
