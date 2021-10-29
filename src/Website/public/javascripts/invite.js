let arr = []
let inputs = document.querySelectorAll(".form-check > input")
document.querySelectorAll(".form-check > input").forEach((ele) =>{
    arr.push({id:ele.id,checked:ele.checked})

    ele.addEventListener("change",(e)=>{
        for(let val of arr){
            if(val.id == ele.id){
                val.checked = ele.checked
            }
        }
        count()
    })
})

let num
function count(){
    num = 0
    for(let val of arr){
        if(val.checked){
            num = num + Number(val.id)
        }
    }
    console.log(num)
}

function genInv(){
    count()
    
    let str = `https://discord.com/api/oauth2/authorize?client_id=860083884968509450&permissions=${num}&scope=bot%20applications.commands`
    
    if(guild.length !== 0){
        str += `&guild_id=${guild}`
    }
    
    window.open(str, '_blank');
}

function countstart(perms){
    if(!isNaN(perms)){
        for (var i = 0, len = inputs.length; i < len; i++) {
            let box = inputs[i]
            
            arr[i].checked = (perms & Number(box.id)) != 0
            box.checked = (perms & Number(box.id)) != 0
        }
    }
}

function toggle(selector){
    document.querySelector(selector).classList.toggle("show")
}