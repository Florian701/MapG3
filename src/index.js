import Station_Velib from "./station_Velib.js";
import Station_Metro from "./station_Metro.js";
import Map from './map.js';



var canvas=document.getElementById("gameScreen");
canvas.width=1500;
canvas.height=1500;
 
var ctx = canvas.getContext("2d");
 
/* ---- VELIB -----
var importStations_Velib=MyData_Velib.data.stations;
var arrayStation_Velib = [];

arrayStation_Velib=loadStations_Velib(importStations_Velib);
var myMap_Velib=new Map(canvas,arrayStation_Velib);
myMap_Velib.drawAllStations(canvas,arrayStation_Velib);

*/ 

// ---- METRO -----
var importStations_Metro=MyData_METRO_RER.elements;
var arrayStation_Metro = [];

arrayStation_Metro=loadStations_Metro(importStations_Metro);

var myMap_Metro=new Map(canvas,arrayStation_Metro);
myMap_Metro.drawAllStations(canvas,arrayStation_Metro);

  function loadStations_Metro(pData)
  {
    var i=0;
    var arrayStation_Metro=[];
    for (i=0;i<pData.length;i++)
    {
      //alert(pData[i].tags.name);
      if(pData[i].type=="node" && pData[i].tags!=null) // JDD : node = stations ?
      {

        console.log(pData[i].id);
      var station=new Station_Metro(pData[i].lat,pData[i].lon,pData[i].tags.name,pData[i].tags.typeRATP,pData[i].id);
      arrayStation_Metro.push(station);
      }
    }
      return arrayStation_Metro;
  }


document.addEventListener("keydown", keyDownTextField, false);



canvas.addEventListener('click', (e) => {
  var rect = canvas.getBoundingClientRect();
  var x= (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
  var y= (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
  onClickCanvas (canvas,x,y);
}
);





function loadStations_Velib(pData)
{
  var i=0;
  var arrayStation_Velib=[];
  for (i=0;i<pData.length;i++)
  {
    
    var station=new Station_Velib(pData[i].lat,pData[i].lon,pData[i].name,pData[i].stationCode);
    arrayStation_Velib.push(station);
  }
    return arrayStation_Velib;
}





function onClickCanvas(canvas,x,y)
{
  var clickedStationID=myMap_Velib.getClickedStationID (canvas,x,y,arrayStation_Velib);
  if (clickedStationID==-1)return;
  document.getElementById("stationDepart").innerHTML="Depart : "+arrayStation_Velib[clickedStationID].stationName;
  document.getElementById("stationArrivee").innerHTML="Arrivée : ";
  

}

function keyDownTextField(e) {
  var keyCode = e.keyCode;
    if(keyCode==13) {
      myMap_Velib.clearStations(canvas);
    } else if(keyCode==16){
      myMap_Velib.drawAllStations(canvas,arrayStation_Velib);
    } else if(keyCode==107)
    {
      myMap_Velib.clearStations(canvas);
      canvas.width+=100;
      canvas.height+=100;
      myMap_Velib.drawAllStations(canvas,arrayStation_Velib);
    }
  
    else if(keyCode==109)
    {
      myMap_Velib.clearStations(canvas);
      canvas.width-=100;
      canvas.height-=100;
      myMap_Velib.drawAllStations(canvas,arrayStation_Velib);
    }
  
  }
