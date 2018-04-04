// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html



var form = document.forms.namedItem("submitForm");
form.addEventListener('submit', function(evt){
    var file = document.getElementById('fileUploaded').files[0];
    var formData = new FormData(form);
    var oReq = new XMLHttpRequest();
    oReq.open("POST", "/get-file-size", true);
    oReq.onload = function(event) {
      if (oReq.status === 200){
        console.log("Ok");
      }else{
        console.log("Error");
      }
    };
    oReq.send(formData);
    evt.preventDefault();
}, false);




