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
		<div className="container text-center">
  <div className="row">
  <div className="col-md-3 col-lg-2"></div>
  <div className="col-md-6 col-lg-8">
  	<div className="playerCard">
   	<img src="images/Flow Player2.png" className="logo"/>
   	<h4>When you thumb up and thumb down, the player will be smarter!!</h4>


   	 <img src="images/gestures.png" className="gestures"/>
   </div>
   <div className="playerCard">
   	<div className="row">
	  <div className="playerButton col-xs-3"><button id="unlike" className="glyphicon glyphicon-thumbs-down mainButton" onClick={ this.handleDislike.bind(this) } disabled={!ready}></button></div>
	  <div className="playerButton col-xs-3"><button id="like" className="glyphicon glyphicon-thumbs-up mainButton" onClick={ this.handleLike.bind(this) } disabled={!ready}></button></div>
	  <div className="playerButton col-xs-3"><button id="play" className="glyphicon  mainButton" onClick={ this.handlePlayPause.bind(this) } disabled={!ready}>{playing?'Pause':'Play'}</button></div>
	  <div className="playerButton col-xs-3"><button id="next" className="glyphicon glyphicon-forward mainButton" onClick={ this.handleNext.bind(this) } disabled={!ready}></button></div>
   	 </div>
   </div>
</div>
   <div className="col-md-3 col-lg-2"></div>
   </div>

   <div className="teamInfo">Team of Flowplayer @ ATT IoT Hackathon (November 7)</div>

</div>

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
