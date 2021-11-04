import ms from "ms";

export function countsUptime(uptime:number) {
  const uptimeString = ms(uptime, {long: true});

  return uptimeString;
}
