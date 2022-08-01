
export const GAME_CONTROLLER_DATA_LOADING = "GAME_CONTROLLER_DATA_LOADING"
export const GAME_CONTROLLER_DATA_SUCCESS = "GAME_CONTROLLER_DATA_SUCCESS"
export const GAME_CONTROLLER_DATA_FAILED = "GAME_CONTROLLER_DATA_FAILED"

export const MINE_LOCATION_LOADING = "MINE_LOCATION_LOADING"
export const MINE_LOCATION_SUCCESS = "MINE_LOCATION_SUCCESS"
export const MINE_LOCATION_FAILED = "MINE_LOCATION_FAILED"

export const UPDATE_MAP_DATA = "UPDATE_MAP_DATA"

export const USER_DATA_LOADING = "USER_DATA_LOADING"
export const USER_DATA_SUCCESS = "USER_DATA_SUCCESS"
export const USER_DATA_FAILED = "USER_DATA_FAILED"


export const async_status = {
    __DEFAULT__: 'async__DEFAULT__',
    __LOADING__: 'async__LOADING__',
    __LOADED__: 'async__LOADED__',
    __FAILED__: 'async__FAILED__',
  };


export interface Actionsinterface {
    type: any,
    payload: {
      status: 'async__DEFAULT__' | 'async__LOADING__' | 'async__LOADED__' | 'async__FAILED__',
      data: any
    }
  
  }