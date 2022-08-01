import * as types from "../Types"


export const updateMapDataAction = (data: any) =>(dispatch: any) => {
   dispatch({
       type: types.UPDATE_MAP_DATA,
       payload: {data: data}
   })
}