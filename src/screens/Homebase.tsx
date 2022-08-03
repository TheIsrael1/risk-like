import GameController from '../components/defaults/GameController'
import Nav from '../components/defaults/Nav'
import Map from '../components/defaults/Map'
import Guard from '../Routes/Guard'

const Homebase = () => {  

  return( 
    <Guard>
    <div id='HomeBase'>
      <Nav />
      <Map />
      <GameController />
    </div>
    </Guard>
  )
}
 
export default Homebase