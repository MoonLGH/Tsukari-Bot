import { Permissions, PermissionString } from "discord.js"


export function makeArrayOfPermission(){
    const arr = []
    for(const perm in Permissions.FLAGS){
        let temppermm
        if(perm === "ADMINISTRATOR") {
            temppermm = "ADMINISTRATOR (recomended)"
        }
        arr.push({name:temppermm || perm, bit:Permissions.FLAGS[(perm as PermissionString)]})
    }
    return arr
}