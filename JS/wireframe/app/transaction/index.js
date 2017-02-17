export const Transact = {}

const portal = (action, cb, ...args)=>{
  var http = new XMLHttpRequest();
  var url = 'portal';
  if(!args){
    args = '[]'
  }
  var params = 'action='+action+'&args='+escape(JSON.stringify(args))

  http.open('POST', url, true);

  //Send the proper header information along with the request
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState === 4 && http.status === 200) {
          let res
          try {
            res = JSON.parse(http.responseText)
          } catch (err) {
            res = http.responseText
          }
          cb(res)
      }
  }
  http.send(params);
}

Transact.loadStrategy = (cb, name)=>{
  portal('loadStrategy', cb, name)
}

Transact.createOrUpdateStrategy = (cb, name, strategy)=>{
  portal('createOrUpdateStrategy', cb, name, strategy)
}

Transact.readStrategyList = (cb)=>{
  portal('readStrategyList', cb)
}
