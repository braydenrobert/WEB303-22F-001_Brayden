// WEB303 Assignment 2


$("button").click(function(){

$("#div1").load("", function(responseTxt, statusTxt, xhr){

if(statusTxt == "success")

	alert("External content loaded successfully!");

if(statusTxt == "error")

	alert("Error: " + xhr.status + ": " + xhr.statusText);

});

});