
const titleCase = (str: string)=>{
    if(str){
        let sentence = str.split("_");
            for(var i = 0; i< sentence.length; i++){
            sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
            }
        return sentence.join(" ");
    }else{
        return "N/A"
    }
}
export default titleCase

