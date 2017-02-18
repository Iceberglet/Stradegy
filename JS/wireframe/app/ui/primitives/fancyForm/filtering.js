//Returns the filtered key label list.
//If no result, returns {key: undefined, label: 'No Matching Result'}
export const filter = (array, tok)=>{
  let token = tok.toLowerCase()
  let result = array.filter(v=>{
    return v.toLowerCase().indexOf(token) > -1
  })
  return result;
}
