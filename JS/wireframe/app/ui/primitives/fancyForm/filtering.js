//Returns the filtered key label list.
//If no result, returns {key: undefined, label: 'No Matching Result'}
export const filter = (keyLabelArray, tok)=>{
  let token = tok.toLowerCase()
  let result = keyLabelArray.filter(kl=>{
    return kl.key.toLowerCase().indexOf(token) > -1 || kl.label.toLowerCase().indexOf(token) > -1
  })
  return result;
}
