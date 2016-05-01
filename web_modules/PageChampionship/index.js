import React, { Component, PropTypes } from 'react';
import fetchJSON from "app/fetchJSON";
import consts from "app/consts"
import InputList from "InputList";
import {connect} from "react-redux";
import { get as getChampionship } from "app/reducers/championship";
import { get as getTeams } from "app/reducers/teams";
import { get as getTable } from "app/reducers/table";
import { get as getFixtures } from "app/reducers/fixtures";
import {Link, IndexLink} from 'react-router';
import styles from "./index.css"

@connect(
    (state) => ({
        championship : state.championship,
        teams : state.teams,
        table : state.table,
        fixtures : state.fixtures,
    }),
    (dispatch) => ({
        getChampionship : (value) => dispatch(getChampionship(value)),
        getTeams : (value) => dispatch(getTeams(value)),
        getTable : (value) => dispatch(getTable(value)),
        getFixtures : (value) => dispatch(getFixtures(value)),
    })
)

export default class PageChampionship extends Component {
    static propTypes = {
        params: PropTypes.shape({
          championshipId:PropTypes.string,
        }),
        championships : PropTypes.object,
        getChampionship : PropTypes.func,
        teams : PropTypes.object,
        table : PropTypes.object,
        fixtures : PropTypes.object,
        getTeams : PropTypes.func,
        getTable : PropTypes.func,
        getFixtures : PropTypes.func,
    };

    static defaultProps = {
        params: {},
        championship : null,
        getChampionship : () => {},
        teams: null,
        table: null,
        fixtures: null,
        getTeams : () => {},
        getTable : () => {},
        getFixtures : () => {},
    };

    state = {
      teams: null,
      table: null,
      fixtures: null,
    };

    componentDidMount(){

        const {
          params,
          getChampionship,
          getTeams,
          getTable,
          getFixtures,
        } = this.props

        if(params.championshipId) {
            getChampionship(params.championshipId);
            getTeams(params.championshipId);
            getTable(params.championshipId);
            getFixtures(params.championshipId);
        }
    }

  render(){
      const {
        params,
        championship,
        table,
        teams,
        fixtures,
      } = this.props
      //console.log(this.state.teams);
    return (
      <div>
        <h1 className={styles.title}>{championship.caption}</h1>
        {
        <div>
            <div className={styles.live}>
                <h3 className={styles.titleClassement}>Résultats</h3>
                <hr/>

                {
                    fixtures &&
                    fixtures.fixtures &&
                    fixtures.fixtures.map((fixture, index) => {
                        fixture.id = fixture._links.self.href.substr(41);
                        if(fixture.status=="FINISHED" ){
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
            <div className={styles.classement}>
                <h3 className={styles.titleClassement}>Classement</h3>
                <hr/>
                <div className={styles.wrapper}>
                    <table>
                        <thead>
                            <tr>
                                <th> </th>
                                <th> </th>
                                <th>Équipes</th>
                                <th>Pts</th>
                                <th>J.</th>
                                <th>G.</th>
                                <th>P.</th>
                                <th>N.</th>
                                <th>p.</th>
                                <th>c.</th>
                                <th>Diff.</th>
                            </tr>
                        </thead>
                        <tbody>
                      {
                        table.standing &&
                        table.standing.map((team, index) => {
                            team.id = team._links.team.href.substr(38);
                          return <tr key={index}>
                            <td>{team.position}</td>
                            <td><img width="22px" height="22px" src={team.crestURI}/></td>
                            <td>
                                <Link to={"/teams/"+team.id}>
                                    {team.teamName}
                                </Link>
                            </td>
                            <td className={styles.pts}>{team.points}</td>
                            <td>{team.playedGames}</td>
                            <td>{team.wins}</td>
                            <td>{team.losses}</td>
                            <td>{team.draws}</td>
                            <td>{team.goals}</td>
                            <td>{team.goalsAgainst}</td>
                            <td>{team.goalDifference}</td>
                            </tr>
                        })
                      }
                      </tbody>
                    </table>
                </div>
            </div>
            <div className={styles.teams}>
                <h3>Équipes</h3>
                <hr/>
                <ul>
                  {
                    teams &&
                    teams.teams &&
                    teams.teams.map((team, index) => {
                        team.id = team._links.self.href.substr(38);
                      return <li className={styles.team} key={index}>
                        <Link to={"/teams/"+team.id}>
                            <figure>
                                <img width="30px" height="30px" src={team.crestUrl}/>
                                <span>{team.shortName}</span>
                            </figure>
                        </Link>
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
