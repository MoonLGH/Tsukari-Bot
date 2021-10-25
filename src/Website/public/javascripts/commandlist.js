let table = document.getElementById("tablePlaceHolder")
let query = document.querySelector("#search-input > input")
let slashParsed = JSON.parse(slash)
let textParsed = JSON.parse(text)

if(type === "slash"){
    table.innerHTML = "<tr><th>Command</th><th>Description</th></tr>"
    for(let i = 0; i < slashParsed.length; i++){
        if(slashParsed[i].name.toLowerCase().includes(search.toLowerCase())){
            table.innerHTML += `<tr><td>${capitalizeFirstLetter(slashParsed[i].name)}</td><td>${slashParsed[i].description}</td></tr>`
        }
    }
}else if (type === "text"){
    table.innerHTML = "<tr><th>Command</th><th>Description</th></tr>"
    for(let i = 0; i < textParsed.length; i++){
        if(textParsed[i].name.toLowerCase().includes(search.toLowerCase()) || textParsed[i].alias.includes(search.toLowerCase())){
            table.innerHTML += `<tr><td>${capitalizeFirstLetter(textParsed[i].name)}${textParsed[i].alias.length !== 0 ? "/" + capitalizeFirstLetterArray(textParsed[i].alias).join("/") : ""}</td><td>${textParsed[i].description}</td></tr>`
        }
    }
}

// make when enter pressed on query do inputchange()
query.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        inputchange();
    }
});

function selectchange(element){
    window.location.href = `?type=${element.value}&q=${search}`
}


function inputchange(){
    window.location.href = `?type=${type}&q=${query.value}`
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function capitalizeFirstLetterArray(arr) {
   for (var i = 0; i < arr.length; i++) {
       arr[i] = capitalizeFirstLetter(arr[i])
   }
    return arr
}
