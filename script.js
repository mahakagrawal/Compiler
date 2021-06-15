var codeOfTextarea;
var langId;
var output;
var codeId;

var compileBtn = document.getElementById("compile");
compileBtn.addEventListener("click", function(){
    document.getElementById("output").innerText = "Code compilation is in progress...";
    codeOfTextarea = document.getElementById("codearea").value;
    langId = document.getElementById("langId").value;
    sendCodeForCompilation();
    setTimeout(outputAfterCompilation,6000);
});

function sendCodeForCompilation(){
    var sendreq=new XMLHttpRequest();
    sendreq.open("POST","https://codequotient.com/api/executeCode");
    sendreq.setRequestHeader("Content-Type", "application/JSON");
    sendreq.send(JSON.stringify({ code:codeOfTextarea,langId:langId}));
    sendreq.addEventListener("load",function(event){
        codeId=JSON.parse(event.target.responseText);
    });
}

function outputAfterCompilation(){
    var getreq=new XMLHttpRequest();
    getreq.open("GET","https://codequotient.com/api/codeResult/"+codeId.codeId);
    getreq.send();
    getreq.addEventListener("load",function(event){
        fetchResultInOutput(JSON.parse(event.target.responseText))
    })
}

function fetchResultInOutput(data){
    var obj = JSON.parse(data.data);
    console.log(obj);
    if(obj.errors!=""){
        document.getElementById("output").innerHTML=obj.errors;
    }
    else{
        document.getElementById("output").innerHTML=obj.output;
    }
}