import { ActionType } from './constants';

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
export function neutral() {
  return {
    type: ActionType.NEUTRAL,
  }
}

