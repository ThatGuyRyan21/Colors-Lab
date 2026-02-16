const urlBase = 'http://thecodinglab.xyz/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

// --- LOGIN FUNCTION ---
function doLogin() {
    userId = 0;
    firstName = "";
    lastName = "";

    let login = document.getElementById("loginName").value;
    let password = document.getElementById("loginPassword").value;

    let tmp = {login:login,password:password};
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/Login.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.id;

                if (userId < 1) {
                    document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
                    return;
                }

                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;

                saveCookie();
                window.location.href = "color.html";
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        document.getElementById("loginResult").innerHTML = err.message;
    }
}

// --- ADD COLOR FUNCTION ---
function addColor() {
    let color = document.getElementById("colorText").value;

    let tmp = {color:color,userId:userId};
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/AddColor.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("colorAddResult").innerHTML = "Color has been added";
                document.getElementById("colorText").value = ""; // Clear input
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        document.getElementById("colorAddResult").innerHTML = err.message;
    }
}

// --- SEARCH COLORS FUNCTION ---
function searchColors() {
    let srch = document.getElementById("searchText").value;

    let tmp = {search:srch,userId:userId};
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/SearchColors.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
                let list = document.getElementById("colorList");
                list.innerHTML = ""; // Clear previous results

                for (let i = 0; i < jsonObject.results.length; i++) {
                    let entry = document.createElement('div');
                    entry.appendChild(document.createTextNode(jsonObject.results[i]));
                    list.appendChild(entry);
                }
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        document.getElementById("colorSearchResult").innerHTML = err.message;
    }
}

// --- COOKIE HELPERS ---
function saveCookie() {
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie() {
    userId = -1;
    let data = document.cookie;
    let splits = data.split(",");

    for(let i = 0; i < splits.length; i++) {
        let thisOne = splits[i].trim();
        let tokens = thisOne.split("=");
        if(tokens[0] == "firstName") firstName = tokens[1];
        else if(tokens[0] == "lastName") lastName = tokens[1];
        else if(tokens[0] == "userId") userId = parseInt(tokens[1].trim());
    }

    if(userId < 0) window.location.href = "index.html";
    else document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
}

function doLogout() {
    userId = 0;
    firstName = "";
    lastName = "";
    document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "index.html";
}
