import React, { Component } from 'react';
import * as Action from './actions';
import { connect } from 'react-redux';
import { Opinion } from './constants';
import Myo from 'myo';

class Chart extends Component {
  render() {
    return (
      
    );
  }
}

class App extends Component {
  play() {
    let { dispatch } = this.props;
    dispatch(Action.playerPlay(this.refs.player));
  }
  pause() {
    let { dispatch } = this.props;
    dispatch(Action.playerPause(this.refs.player));
  }
  next() {
    let { dispatch } = this.props;
    dispatch(Action.playerNext(this.refs.player));
  }
  handlePlayPause() {
    let { playing } = this.props;
    if(playing) {
      this.pause();
    } else {
      this.play();
    }
  }

  handleNext() {
    this.next();
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

  componentDidMount() {
    Myo.connect('com.myojs.poseDetector');
    
    Myo.on('status', function(data){
      //console.log(JSON.stringify(data, null, 2));
    })

    Myo.on('pose', (pose) => {
      console.log(`myo pose: ${pose}`);
      switch(pose){
        case 'fingers_spread':
          this.play();
          console.log('play');
          break;
        case 'fist':
          this.pause();
          console.log('pause');
          break;
        case 'wave_out':
          this.next();
          console.log('next');
          break;
        default:
      }
    })

    //Opposite of above. We also revert the main img to the unlocked state
    Myo.on('pose_off', (pose) => {
      console.log(`myo pose off: ${pose}`);
    });


    //Whenever a myo locks we'll switch the main image to a lock image
    Myo.on('locked', () => {
      console.log(`myo sleep`);
    });

    //Whenever a myo unlocks we'll switch the main image to a unlock image
    Myo.on('unlocked', () => {
      console.log(`myo standby`);
    });

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

