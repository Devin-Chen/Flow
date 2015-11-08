import { ActionType } from './constants';
import update from './chart';

export function playerPlay(player) {
  return (dispatch, getState)=>{
    player.play();
    dispatch(play());
  };
}
export function playerPause(player) {
  return (dispatch, getState)=>{
    player.pause();
    dispatch(pause());
  };
}
export function playerNext(player) {
  return (dispatch, getState)=>{
    dispatch(next());
    let s = getState();
    player.src = s.playList[s.playIndex].url;
    player.load();
    player.play();
  };
}

export function play() {
  return {
    type: ActionType.PLAY,
  };
}
export function pause() {
  return {
    type: ActionType.PAUSE,
  };
}
export function next() {
  return {
    type: ActionType.NEXT,
  };
}
export function like() {
  return {
    type: ActionType.LIKE,
  }
}
export function dislike() {
  return {
    type: ActionType.DISLIKE,
  }
}
export function likeUpdate() {
  return (dispatch, getState)=>{
    let s = getState();
    update(0, s.playList[s.playIndex].topic);
    dispatch(like());
  };

}
export function dislikeUpdate() {
  return (dispatch, getState)=>{
    let s = getState();
    update(1, s.playList[s.playIndex].topic);
    dispatch(dislike());
  };
}
export function neutral() {
  return {
    type: ActionType.NEUTRAL,
  }
}

