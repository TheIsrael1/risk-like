

    export const objectParser = (obj: any) =>{
        if(obj instanceof Array){   
            const body = obj?.map((o: any, idx: number)=>{
                return (
                    <div key={idx}  className="propertyWrapper">
                            {objectParser(o)}
                    </div>
                )
            })
            return body?.length  ?
            (
                <div className="value">
                    {body}
                </div>
            )  : `[ ]`
        }else if(typeof obj === "object"){
            const body =  Object.entries(obj)?.map(([key, value], idx)=>(
                <div key={idx} className="property">
                    <div className="key">
                            {key}
                    </div>
                     {objectParser(value) }
                </div>
            ))
            return body.length ? body : "{ }"
        }else if(obj === undefined){
             return(
                <div className="value">
                    No Data
                </div>  
             )        
        }else{
            return (
                <div className="value">
                    {`${obj}`.length ? `${obj}` : "---"}
                </div>
            )
    }
}