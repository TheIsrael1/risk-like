import React, {useState, useRef, useCallback, useEffect} from 'react'
import AssetsModalCon from '../modals/AssetsModalCon'
import arrowCircled from '../../assets/icons/arrowCircled.svg'
import mineDetails from '../../assets/icons/mineDetails.png'
import { getCountryNameFromCoord, getValueByKey } from '../Helpers/general'


interface MineDetailsDropdownInterface{
    item: any,
    img: string
}

const MineDetailsDropdown = ({item, img}:MineDetailsDropdownInterface) => {

    const [open, setOpen] = useState(false)
    const [locationName, setLocationName] = useState("")

    const toggle = (i: boolean) =>{
        setOpen(i)
    }

 const ref = useRef<HTMLDivElement>(null)


 document.addEventListener('click', (e)=>handleClickOutside(e))

    const handleClickOutside = (e: any) =>{
        if((open && ref.current && !ref.current.contains(e.target)) || 
            (open && e.target.className === "cancelBtn")){
            toggle(false)
        }
    }

    const getCountry = useCallback(async(lat: any, lng: any)=>{
        const data = await getCountryNameFromCoord(lat, lng)
        setLocationName(`${data["_locality"]}, ${data["_country"]}`)
    },[])

    useEffect(()=>{
        getCountry(item?.location?.lat, item?.location?.long)
    },[getCountry, item])

  return (
    <div className={`mineCard ${open && `active`}`} ref={ref}
    onClick={()=>toggle(true)}
    >
        <div className='mineName'>
        {item?.location?.name}
        </div>
        <div className='rateCon'> 
            <span className='rateH'>
            Minning Rate: 
            </span>
            <span className='rateValue'>
                {getValueByKey(item?.location.properties, "production_rate")}{" "}
                {getValueByKey(item?.location.properties, "mine_type")}/hr
            </span>
        </div>
        <div className='detailsDropCon'>
            <img src={arrowCircled} alt="arrow" className='arrowTo' 
            />
            <div className={`detailsDrop ${open && `open`}`} >
                <AssetsModalCon 
                mainDrop={false}
                cancelBtn={true}
                open={open}
                toggle={()=>toggle(false)}
                >
                <div className='detailsTop'>
                    <div>
                        <img  src={mineDetails} alt="mine" className='mineImg' />
                    </div>
                    <div>
                        <span className='rtkValue'>
                            {item?.rtkValue ?? "N/A"}
                        </span>
                    </div>
                </div>
                <div className='detailsRow'>
                    <span className='detailTitle'>
                    Mine Type:
                    </span>
                    <span className='detailValue bold'>
                    <img width={40} src={img} alt="mineTpe" />
                    </span>
                </div>
                <div className='detailsRow'>
                    <span className='detailTitle'>
                    Mine Level:
                    </span>
                    <span className='detailValue bold'>
                    {item?.mineLevel ?? "N/A"}
                    </span>
                </div>
                <div className='detailsRow'>
                    <span className='detailTitle'>
                    Mining Rate:
                    </span>
                    <span className='detailValue bold'>
                    {getValueByKey(item?.location.properties, "production_rate")}{" "}
                    {getValueByKey(item?.location.properties, "mine_type")}/hr
                    </span>
                </div>
                <div className='detailsRow'>
                    <span className='detailTitle'>
                    Location:
                    </span>
                    <span className='detailValue bold'>
                    {locationName ?? "N/A"}
                    </span>
                </div>
                <div className='detailsRow'>
                    <span className='detailTitle'>
                    Decomissioned:
                    </span>
                    <span className='detailValue bold'>
                    {item?.decomissioned ?? "N/A"}
                    </span>
                </div>
                </AssetsModalCon>
            </div>
        </div>
    </div>
  )
}

export default MineDetailsDropdown