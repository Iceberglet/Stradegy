export const Transact = {}

Transact.test = ()=>{
  var http = new XMLHttpRequest();
  var url = 'test';
  var params = 'action=loadStrategy&content=StrategyName'

  http.open('POST', url, true);

  //Send the proper header information along with the request
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState === 4 && http.status === 200) {
          alert(http.responseText, http.response);
          console.log(http.responseText, http.response);
      }
  }
  http.send(params);
}
