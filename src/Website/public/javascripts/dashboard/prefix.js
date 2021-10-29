function save(){
    let prefixes = [];
    let prefixelement = document.querySelectorAll("#prefix")

    for(let prefix of prefixelement){
        if(prefixes.includes(prefix.value)){
            return;
        }
        prefixes.push(prefix.value);
    }

    window.open(`?prefixes=${encodeURIComponent(JSON.stringify(prefixes))}`)
}

let list = document.getElementById('prefix-list');
function addprefix(){
    list.innerHTML += `
    <div class="container" style="border: 3px solid var(--bs-dark); border-radius: 15px;">
    <div class="row"style="margin-top: 10px;">
            <div class="col-md-12">
                <input type="text" id="prefix" class="login-input" style="font-size: 30px; border-radius:10px">
            </div>
    </div>
    <div class="row" style="margin-bottom: 10px;">
            <div class="col-md-12">
                <button class="btn btn-primary" onclick="delprefix(this)">Delete</button>
            </div>
    </div>
</div>
`
}

function delprefix(prefix){
    prefix.parentNode.parentNode.parentNode.remove();
}