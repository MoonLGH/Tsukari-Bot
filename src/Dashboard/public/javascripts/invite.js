let arr = []
document.querySelectorAll(".form-check > input").forEach((ele) =>{
    if(ele.id === "slash"){
        return
    }
    arr.push({id:ele.id,checked:ele.checked})

    ele.addEventListener("change",(e)=>{
        for(let val of arr){
            if(val.id == ele.id && ele.id != "8"){
                if(eight) return ele.checked = false
                val.checked = ele.checked
            }else if (ele.id === "8"){
                iseight(ele.checked)
            }
        }
        count()
    })
})

let eight = false
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

function iseight(checked){
    document.querySelectorAll(".form-check > input").forEach((ele) =>{
        if(ele.id === "slash") return

        if(ele.id === "8"){
            eight = checked
            ele.checked = checked
        }else{
            ele.checked = false
        }
        for(let val of arr){
            if(val.id == ele.id){
                val.checked = ele.checked
            }
        }
    })
}

function genInv(){
    let str = `https://discord.com/api/oauth2/authorize?client_id=860083884968509450&permissions=${num}&scope=bot`
    
    if(document.querySelector("#slash").checked){
        str += "%20applications.commands"
    }
    document.getElementById("invites").innerHTML += `<a href="${str}">Click Me</a>`
}