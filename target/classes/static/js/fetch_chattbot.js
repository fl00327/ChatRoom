var usermsg = message9.content;
usermsg = usermsg.replace(/ /g,"_");

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        console.log(this.responseText);
    }
});

xhr.open("GET", "http://127.0.0.1:5000/"+usermsg);

xhr.send();