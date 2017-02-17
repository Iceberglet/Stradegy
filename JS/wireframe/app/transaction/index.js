export const Transact = {}

const portal = (action, content, cb)=>{
  var http = new XMLHttpRequest();
  var url = 'portal';
  var params = 'action='+action+'&content='+content

  http.open('POST', url, true);

  //Send the proper header information along with the request
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState === 4 && http.status === 200) {
          alert(http.responseText, http.response);
          console.log(http.responseText, http.response);
          cb(http.responseText)
      }
  }
  http.send(params);
}

Transact.loadStrategy = (name, cb)=>{
  portal('loadStrategy', name, cb)
}

Transact.createOrUpdateStrategy = (name, strategy, cb)=>{
  portal('createOrUpdateStrategy', name, cb)
}
