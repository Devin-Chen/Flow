import React, { Component } from 'react';
import * as Action from './actions';
import { connect } from 'react-redux';
import { Opinion } from './constants';

class App extends Component {
  handlePlayPause() {
    let { dispatch, playing } = this.props;
    if(playing) {
      dispatch(Action.playerPause(this.refs.player));
    } else {
      dispatch(Action.playerPlay(this.refs.player));
    }
  }

  handleNext() {
    let { dispatch, playIndex } = this.props;
    dispatch(Action.next());
  }

  handleLike() {
    let { dispatch, playList, playIndex } = this.props;
    if(playList[playIndex].opinion === Opinion.LIKE) {
      dispatch(Action.neutral());
    } else {
      dispatch(Action.like());
    }
  }

  handleDislike() {
    let { dispatch, playList, playIndex } = this.props;
    if(playList[playIndex].opinion === Opinion.DISLIKE) {
      dispatch(Action.neutral());
    } else {
      dispatch(Action.dislike());
    }
  }

  render() {
    let {playing, dispatch, playList, playIndex} = this.props;
    let ready;
    if(playIndex >= 0 && playIndex < playList.length) {
      ready = true;
    } else {
      ready = false;
    }
    return (
      <div>
        <button onClick={ this.handlePlayPause.bind(this) } disabled={!ready} >
          {playing?'Pause':'Play'}
        </button>
        <button onClick={ this.handleNext.bind(this) } disabled={!ready} >
          Next
        </button>
        <button onClick={ this.handleLike.bind(this) } disabled={!ready} >
          Like
        </button>
        <button onClick={ this.handleDislike.bind(this) } disabled={!ready} >
          Dislike
        </button>

        <div>
          <audio ref="player">
            <source 
              src="http://pd.npr.org/anon.npr-mp3/npr/me/2015/11/20151105_me_in_the_amazons_fire_season_you_either_burn_or_you_starve.mp3"
              type="audio/mpeg">
            </source>
          </audio>
        </div>

      </div>
    );
  }
}

export default connect((state)=>state)(App);

