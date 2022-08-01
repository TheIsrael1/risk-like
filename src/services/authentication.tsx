import  {ApiNoAuth} from "./index"


export const login = (data: any) =>
  ApiNoAuth.post('/login', data)

export const register = (data: any)=>
    ApiNoAuth.post('/sign-up', data)

export const adminLogin = (data: any) =>
    ApiNoAuth.post('/admin/login', data)

export const adminRegister = (data: any)=>
    ApiNoAuth.post('/admin/sign-up', data)

