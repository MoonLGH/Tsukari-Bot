import {Permissions, PermissionString} from "discord.js";


export function makeArrayOfPermission() {
  const arr = [];
  // eslint-disable-next-line guard-for-in
  for (let perm in Permissions.FLAGS) {
    const bitperm = Permissions.FLAGS[(perm as PermissionString)];
    perm = perm === "ADMINISTRATOR"?"ADMINISTRATOR (recomended)":perm;
    arr.push({name: perm, bit: bitperm});
  }
  return arr;
}
