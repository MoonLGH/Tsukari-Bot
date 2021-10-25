import ms from "ms"

export function countsUptime(uptime:number) {
    let uptimeString = ms(uptime,{long:true})

    return uptimeString
}