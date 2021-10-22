let table = document.getElementById("tablePlaceHolder")

let slashParsed = JSON.parse(slash)
let textParsed = JSON.parse(text)

if(type === "slash"){
    table.innerHTML = "<tr><th>Command</th><th>Description</th></tr>"
    for(let i = 0; i < slashParsed.length; i++){
        let row = table.insertRow(i+1)
        let command = row.insertCell(0)
        let description = row.insertCell(1)
        command.innerHTML = slashParsed[i].name
        description.innerHTML = slashParsed[i].description
    }
}