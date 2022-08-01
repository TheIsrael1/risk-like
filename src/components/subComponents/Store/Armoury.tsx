import React, {useCallback, useEffect, useState} from 'react'
import arrowLeftBig from "../../../assets/icons/arrowLeftBig.svg"
import arrowRightBig from "../../../assets/icons/arrrowRightBig.svg"
import AliceCarousel from 'react-alice-carousel';
import ShortCard from '../../common/ShortCard';
import { buyAssets, getAssets } from '../../../services/storeService';
import AlertModal from '../../modals/AlertModal';
import { useDispatch } from 'react-redux';
import { updateUserAssets, updateUserTokens } from '../../../redux/Actions/userAction';
import { useToast } from '../../Toast/ToastContexProvidert';
import { handleError } from '../../Helpers/general';


const Armoury = () => {

  const [state, setState] = useState({
    currData: [] as any,
    loading: true,
    openBuyConfirmation: false,
    cart: {} as any
  })

  const userId = sessionStorage.getItem("id") as string

  // const {userData} = useSelector((state: RootState)=> state)
  const dispatch = useDispatch()
  const {timedToast} = useToast()

  const getAllAssets = useCallback(async()=>{
      try{
          const {data} = await getAssets()
          setState((prev)=>{
            return{
              ...prev,
              currData: data,
              loading: false
            }
          })
      }catch(err){
        timedToast?.(`${handleError(err)}`)
      }
  },[])

  useEffect(()=>{
    getAllAssets()
  },[getAllAssets])


  const toggleBuyConfirmation = (i: boolean) =>{
    setState((prev)=>{
    return{
        ...prev,
      openBuyConfirmation: i
    }
  })}

  const setCartItem = (id: string) =>{
    const item = state.currData.find?.((item: any)=>item?.id === id) 
    setState((prev)=>{
      return{
        ...prev,
        cart: item
      }
    })
  }

  const getResponse = (yes: boolean) => {
    yes ? buyResource() : toggleBuyConfirmation(false)
    }

    const buyResource = async()=>{
      toggleBuyConfirmation(false)
      try{
          const {data} = await buyAssets(state.cart?.id ,{
            "owner_id": userId,
            "quantity": 1
          })
          timedToast?.(data?.msg)
          dispatch(updateUserTokens(userId) as any)
          dispatch(updateUserAssets(userId) as any)
      }catch(err){
        timedToast?.(`${handleError(err)}`)
      }
    }
  


  return (
    <>
    <AlertModal
    open={state.openBuyConfirmation}
    toggle={()=>toggleBuyConfirmation(false)}
    description={`Are you sure you want to purchase this ${state.cart.name}`}
    title={`Confirm`}
    img={state.cart?.image}
    getResponse={(i: boolean)=> getResponse(i)}
    />
    <AliceCarousel 
    // innerWidth={200}
    mouseTracking
    controlsStrategy='alternate'
    disableDotsControls
    autoPlay={false}

    keyboardNavigation={true}
    responsive={ {
        0: {
            items: 1,
        },
        1024: {
            items: 4
        }
      }}
    animationType={`fadeout`}
    renderPrevButton={({isDisabled})=><img width={100} src={arrowLeftBig} alt="" className='arrowL'/>}
    renderNextButton={({isDisabled})=><img width={100} src={arrowRightBig} alt="" className="arrowR" />}
     >
    {state.currData?.map?.((item: any, idx: number)=>(
        <ShortCard
        clicked={()=>{toggleBuyConfirmation(true); setCartItem(item?.id)}}
        price={item?.price}
        resourceCount={1}
        resourceImg={item?.image}
        resourceName={item?.name}
        currency={item?.currency}
        key={idx}
        />

    ))}
    
    </AliceCarousel>
    </>
  )
}

export default Armoury