

export const isMyLocation = (loacations: any) =>{
    const userId = sessionStorage.getItem("id")
    const myLocations = loacations.filter?.((location: any)=>
        location?.owner_id === userId
    )

    return myLocations
}

