import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

const PLAY = 'PLAY';
const PAUSE = 'PAUSE';
const NEXT = 'NEXT';
const LIKE = 'LIKE';
const DISLIKE = 'DISLIKE';

function play() {
  return {
    type: PLAY,
  };
}
function pause() {
  return {
    type: PAUSE,
  };
}
function next() {
  return {
    type: NEXT,
  };
}
function like() {
  return {
    type: LIKE,
  }
}
function dislike() {
  return {
    type: DISLIKE,
  }
}

const OPINION = {
  LIKE: 'LIKE',
  DISLIKE: 'DISLIKE', 
  NEUTRAL: 'NEUTRAL',
}

let initialState = { 
  playing: false, 
  programs: [
    {
      title: 'amazon', 
      url: 'http://pd.npr.org/anon.npr-mp3/npr/me/2015/11/20151105_me_in_the_amazons_fire_season_you_either_burn_or_you_starve.mp3?orgId=1&topicId=1025&d=420&p=3&story=453239276&t=progseg&e=454828028&seg=3&ft=nprml&f=',
      opinion: OPINION.NEUTRAL,
    },
    {
      title: 'bernie', 
      url: 'http://pd.npr.org/anon.npr-mp3/npr/me/2015/11/20151105_me_bernie_sanders_still_sees_a_path_to_the_presidency.mp3?orgId=1&topicId=1014&d=401&p=3&story=454702147&t=progseg&e=454828028&seg=1&ft=nprml&f=',
      opinion: OPINION.NEUTRAL,
    },
  ],
  current: 0,
};

function createPrograms(programs, index, opinion) {
  return [...programs.slice(0, index), 
      Object.assign({}, programs[index], {opinion}),
      ...programs.slice(index+1)];
}

function reducer(
  state=initialState, action) {

  let opinion;
  switch(action.type) {
    case PLAY:
      return Object.assign({}, state, {playing: true});
    case PAUSE:
      return Object.assign({}, state, {playing: false});
    case NEXT:
      let newCurrent;
      if(state.current < state.programs.length - 1) {
        newCurrent = state.current + 1;
      } else {
        newCurrent = 1;
      }
      return Object.assign({}, state, { current: newCurrent }); 
    case LIKE:
      if(state.programs[state.current].opinion === OPINION.LIKE) {
        opinion = OPINION.NEUTRAL;
      } else {
        opinion = OPINION.LIKE;
      }
      return Object.assign({}, state, { 
          programs: createPrograms(state.programs, state.current, opinion)}); 
    case DISLIKE:
      if(state.programs[state.current].opinion === OPINION.DISLIKE) {
        opinion = OPINION.NEUTRAL;
      } else {
        opinion = OPINION.DISLIKE;
      }
      return Object.assign({}, state, { 
          programs: createPrograms(state.programs, state.current, opinion)}); 
    default:
      return state;
  }
}

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
const store = createStoreWithMiddleware(reducer);

store.dispatch(play());
store.dispatch(pause());
store.dispatch(like());
store.dispatch(like());
store.dispatch(dislike());
store.dispatch(next());

