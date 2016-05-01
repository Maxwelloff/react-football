import React, { Component, PropTypes } from 'react';
import {connect} from "react-redux";
import fetchJSON from "app/fetchJSON";
import consts from "app/consts"

import { get as getArtist } from "app/reducers/artist"

import ItemDetails from "ItemDetails"

@connect(
    (state) => ({
        artist : state.artist
    }),
    (dispatch) => ({
        getArtist : (value) => dispatch(getArtist(value)),
    })
)
export default class PageArtist extends Component {

  static propTypes = {
      params: PropTypes.shape({
        artistId:PropTypes.string,
      }),
      artists : PropTypes.object,
      getArtist : PropTypes.func,
  };

  static defaultProps = {
      params: {},
      artist : null,
      getArtist : () => {}
  };
  componentDidMount(){

      const {
        params,
        getTeam,
      } = this.props

      if(params.artistId) getArtist(params.artistId)
  }

  componentWillReceiveProps(nextProps){
    const {
      params,
      getArtist,
    } = this.props

    if(nextProps.params.artistId!=params.artistId){
      getArtist(nextProps.params.artistId)
    }
  }

  render() {
    const {
      params,
      artist,
    } = this.props
    return (
      <div>      
        {
            artist && !artist.loading &&
            <ItemDetails name={artist.name}
                         image={artist.picture ? artist.picture.url : null}
                         kinds={artist.genres}
                         songs={[{name:"..."},{name:"..."},{name:"..."}]}  />
        }
      </div>
    )
  }
}
