import React, { Component, PropTypes } from 'react';
import {connect} from "react-redux"
import fetchJSON from "app/fetchJSON";
import consts from "app/consts"
import InputList from "InputList";

import { get as getTeams } from "app/reducers/teams"
import { get as getPlayers } from "app/reducers/players"
import { get as getChampionship } from "app/reducers/championship"

import styles from "./index.css";

@connect(
    (state) => ({
        teams : state.teams,
        players: state.players,
        championship: state.championship,
    }),
    (dispatch) => ({
        getTeams : (value) => dispatch(getTeams(value)),
        getPlayers : (value) => dispatch(getPlayers(value)),
        getChampionship : (value) => dispatch(getChampionship(value))
    })
)
export default class InputArtist extends Component {

  static contextTypes = {
      router: PropTypes.object,
  };

  static propTypes = {
      teams : PropTypes.object,
      getTeams : PropTypes.func,
      players : PropTypes.object,
      getPlayers : PropTypes.func,
      championship : PropTypes.object,
      getChampionship : PropTypes.func,
  };

  static defaultProps = {
      teams : {},
      getTeams : () => {},
      players : {},
      getPlayers : () => {},
      championship : {},
      getChampionship : () => {},
  };

  onInputPlayerChange = (value) => {
      this.props.getPlayers(value)
    //   this.props.getTeams(value),
    //   this.props.getChampionship(value)
  };

  selectPlayer = (item) => {
      this.context.router.push(`/teams/${item.id/players}`)
  };

  render() {
    return (
      <div className={styles.input}>
        <InputList title="Search"
              onItemClick={this.selectPlayers}
              items={this.props.players.results}
              autoFilter={true}
              onInputChange={this.onInputPlayerChange} />
      </div>
    )
  }
}
