import React, { useEffect, useState } from 'react'
import GameController from '../components/defaults/GameController'
import Nav from '../components/defaults/Nav'
import Loader from '../components/utility/Loader'

const Homebase = () => {

  const [state, setState] = useState({
    loading: true
  })

  useEffect(()=>{
    setTimeout(()=>setState((prev)=>{
      return{
        ...prev,
        loading: false
      }
    }), 3000)
  },[])

  return state.loading ? 
  <Loader />
  :
  (
    <>
      <Nav />
      <GameController />
    </>
  )
}

export default Homebase