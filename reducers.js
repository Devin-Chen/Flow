import { Opinion, ActionType } from './constants';

let initialState = { 
  playing: false, 
  playList: [
    {
      title: 'amazon', 
      url: 'http://pd.npr.org/anon.npr-mp3/npr/me/2015/11/20151105_me_in_the_amazons_fire_season_you_either_burn_or_you_starve.mp3?orgId=1&topicId=1025&d=420&p=3&story=453239276&t=progseg&e=454828028&seg=3&ft=nprml&f=',
      topic: 0,
      opinion: Opinion.NEUTRAL,
    },
    {
      title: 'bernie', 
      url: 'http://pd.npr.org/anon.npr-mp3/npr/me/2015/11/20151105_me_bernie_sanders_still_sees_a_path_to_the_presidency.mp3?orgId=1&topicId=1014&d=401&p=3&story=454702147&t=progseg&e=454828028&seg=1&ft=nprml&f=',
      topic: 1,
      opinion: Opinion.NEUTRAL,
    },
    {
      title: 'test',
      url: 'http://pd.npr.org/anon.npr-mp3/npr/me/2015/11/20151105_me_as_taiwan_gears_up_for_elections_china_as_always_looms_large.mp3?orgId=1&topicId=1125&d=230&p=3&story=454576853&t=progseg&e=454828028&seg=15&ft=nprml&f=',
      topic: 2,
      opinion: Opinion.NEUTRAL,
    },
    {
      title: 'test',
      url: 'http://pd.npr.org/anon.npr-mp3/npr/me/2015/11/20151105_me_powerful_gene_drive_can_quickly_change_an_entire_species.mp3?orgId=1&topicId=1128&d=300&p=3&story=451216596&t=progseg&e=454828028&seg=10&ft=nprml&f=',
      topic: 3,
      opinion: Opinion.NEUTRAL,
    },
    {
      title: 'test',
      url: 'http://pd.npr.org/anon.npr-mp3/npr/me/2015/11/20151105_me_how_a_folding_electric_vehicle_went_from_car_of_the_future_to_obsolete.mp3?orgId=1&topicId=1019&aggIds=155914958&d=420&p=3&story=454693583&t=progseg&e=454828028&seg=11&ft=nprml&f=',
      topic: 4,
      opinion: Opinion.NEUTRAL,
    }

  ],
  playIndex: 0,
};

function createPrograms(playList, index, opinion) {
  return [...playList.slice(0, index), 
      Object.assign({}, playList[index], {opinion}),
      ...playList.slice(index+1)];
}

// The controls are overloaded on a real audio player, like play and pause. 
// Maybe a reducer should not behave the same way...
export default function reducer(
  state=initialState, action) {

  let opinion;
  switch(action.type) {
    case ActionType.PLAY:
      return Object.assign({}, state, {playing: true});
    case ActionType.PAUSE:
      return Object.assign({}, state, {playing: false});
    case ActionType.NEXT:
      let newCurrent;
      if(state.playIndex < state.playList.length - 1) {
        newCurrent = state.playIndex + 1;
      } else {
        newCurrent = 0;
      }
      return Object.assign({}, state, { playIndex: newCurrent }); 
    case ActionType.LIKE:
      if(state.playList[state.playIndex].opinion !== Opinion.LIKE) {
        opinion = Opinion.LIKE;
        return Object.assign({}, state, { 
            playList: createPrograms(state.playList, state.playIndex, opinion)}); 
      } else {
        return state;
      }
    case ActionType.DISLIKE:
      if(state.playList[state.playIndex].opinion !== Opinion.DISLIKE) {
        opinion = Opinion.DISLIKE;
        return Object.assign({}, state, { 
            playList: createPrograms(state.playList, state.playIndex, opinion)}); 
      } else {
        return state;
      }
    case ActionType.NEUTRAL:
      if(state.playList[state.playIndex].opinion !== Opinion.NEUTRAL) {
        opinion = Opinion.NEUTRAL;
        return Object.assign({}, state, { 
            playList: createPrograms(state.playList, state.playIndex, opinion)}); 
      } else {
        return state;
      }
    default:
      return state;
  }
}

