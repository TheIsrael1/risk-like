
export const GAME_CONTROLLER_DATA_LOADING = "GAME_CONTROLLER_DATA_LOADING"
export const GAME_CONTROLLER_DATA_SUCCESS = "GAME_CONTROLLER_DATA_SUCCESS"
export const GAME_CONTROLLER_DATA_FAILED = "GAME_CONTROLLER_DATA_FAILED"






export const async_status = {
    __DEFAULT__: 'async__DEFAULT__',
    __LOADING__: 'async__LOADING__',
    __LOADED__: 'async__LOADED__',
    __FAILED__: 'async__FAILED__',
  };


export interface Actionsnterface {
    type: any,
    payload: {
      status: 'async__DEFAULT__' | 'async__LOADING__' | 'async__LOADED__' | 'async__FAILED__',
      data: any
    }
  
  }