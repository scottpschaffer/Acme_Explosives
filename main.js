"use strict";

// function blah(result){
//  alert(result.id);
// }
  let a = [];
  let theCategories = [];
  let theTypes = [];
  let theProducts = [];
  let selectedCat;
$(document).ready(function(){


  let firstRead = function(){
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "categories.json"
      }).done(function(data){
        resolve(data);
      }).fail(function(xhr, status, error){
        reject(error);
      });
    })
  };

  let secondRead = function(){
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "types.json"
      }).done(function(data){
        console.log("data", data);
        resolve(data);
      }).fail(function(xhr, status, error){
        reject(error);
      });
    })
  };

  let thirdRead = function(){
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "products.json"
      }).done(function(data){
        resolve(data);
      }).fail(function(xhr, status, error){
        reject(error);
      });
    })
  };

  firstRead()
    .then(function(data1){
      // console.log("data1", data1);
      // console.log("data1.categories[0]", data1.categories[0]);
      theCategories = data1.categories;
      return secondRead(data1);
      
    }).then(function(data2){
      console.log("data2", data2);
      theTypes = data2.types;
      return thirdRead(data2);
    }).then(function(data3){
      console.log("data3", data3);
      theProducts = data3.products;
      domFillSelect();
    });
});
  //var $qqq1 = $(`<option value='qwert'>qwert</option>`);
  // var $qqq2 = $("<option value='trewq'>trewq</option>");

  // $('#cat1').append($("<option value='qwert'>qwert</option>"));

  // $('#cat1').append($qqq1);
  // $('#cat1').append($qqq2);


function domFillSelect(){
  // console.log("aa", aa.length);
  for (let i=0; i<theCategories.length; i++){
    var $addToSelect = $(`<option value='${theCategories[i].name}'>${theCategories[i].name}</option>`);
    $('#cat1').append($addToSelect);
  }
  
}

$('#cat1').change(function(){
  alert (this.value);
  let selectedTypes = [];
  let selectedProducts = [];

  $("#type1").text("Type #1: ");
  $("#type2").text("Type #2: ");
  $("#type3").text("Type #3: ");

  for (let j=0; j<theCategories.length; j++){
    if (theCategories[j].name === this.value){
      selectedCat = theCategories[j].id;
      alert(selectedCat);
    }
  }

  for (let k=0; k<theTypes.length; k++){
    if (theTypes[k].category === selectedCat){
      selectedTypes.push(theTypes[k]);
    }
  }
  console.log("selectedTypes", selectedTypes);
  
  for (let l=0; l<theProducts.length; l++){
    for (let m=0; m<selectedTypes.length; m++){
      if (theProducts[l].type === selectedTypes[m]){
        selectedProducts.push(theProducts[l].id);
      }
    }
  }
  console.log("selectedProducts", selectedProducts);

  
  $("#type1").append(selectedTypes[0].name + ' - "' + selectedTypes[0].description + '"');
  $("#type2").append(selectedTypes[1].name + ' - "' + selectedTypes[1].description + '"');
  $("#type3").append(selectedTypes[2].name + ' - "' + selectedTypes[2].description + '"');


});
// });

// .append($qqq);
// function getCategories(){
//   return new Promise(loadSelect, reject) => {
//     let categories = [];
//     let load1 = new XMLHttpRequest();
//     load1.addEventListener("load", function(){
//       let catList = JSON.parse(this.responeText).categories;
//       loadSelect(categories);
//     });
//     load1.addEventListener("error", function(){
//       reject();
//     });
//     load1.open("GET", "categories.json");
//     load1.send();
//   }
// }

// function loadSelect(arrCat){
//   let bigDiv = document.getElementById("display");
//   let divString = "<select id='catSelect'>";
//   for (let a=0; a<arrCat.length; a++){
//     divString += "<option value='" + arrCat[a].name + "'>" + arrCat[a].name + "</option>";
//   }
//   divString += "</select>";
//   bigDiv.innerHTML = divString;
// }

// getCategories()
//   .then(
//   function loadSelect(arrCat){
//     let bigDiv = document.getElementById("display");
//     alert("edddd");
//     let divString = "<select id='catSelect'>";
//     for (let a=0; a<arrCat.length; a++){
//       divString += "<option value='" + arrCat[a].name + "'>" + arrCat[a].name + "</option>";
//     }
//     divString += "</select>";
//     bigDiv.innerHTML = divString;
//   },
//     // The second callback function will be invoked when you reject
//     function(arrCat) {
//       console.log("API call not successful");
//     }
//   );

