import {ColorResolvable, Message} from "discord.js";
import D from "discord.js";
import {inspect} from "util";
import * as ts from "typescript";
import fetch from "node-fetch";
import config from "../../default";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const text = require("../../util/others/string.js");

export = {
  "name": "eval",
  "usage": `${config.defaultprefix}owner eval \`\`\`\\ Codeblock Of Code\`\`\` `,
  "description": "Eval A Code",
  "execute": async function(msg:Message, command:string, args:Array<string>) {
    try {
      const matches = msg.content.match(/```(?:(?<lang>\S+)\n)?\s?(?<code>[^]+?)\s?```/)?.groups || msg.content.match(/```(?<code>[^]+?)\s?```/)?.groups;
      let coded = matches!.code;
      if (matches!.lang && matches!.lang.toLowerCase() === "ts") {
        coded = ts.transpile(matches!.code);
      }
      let evaled = eval(coded);
      const raw = evaled;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let promise:any; let output; let bin; let download; let type; let color;

      if (evaled instanceof Promise) {
        msg.channel.sendTyping();
        // eslint-disable-next-line prefer-const
        promise = await evaled
            .then((res) => {
              return {resolved: true, body: inspect(res, {depth: 0})};
            })
            .catch((err) => {
              return {rejected: true, body: inspect(err, {depth: 0})};
            });
      }

      if (typeof evaled !== "string") {
        evaled = inspect(evaled, {depth: 0});
      }

      if (promise) {
        output = text.clean(promise.body);
      } else {
        output = text.clean(evaled);
      }

      if (promise?.resolved) {
        color = "GREEN";
        type = "Promise (Resolved)";
      } else if (promise?.rejected) {
        color = "RED";
        type = "Promise (Rejected)";
      } else {
        color = "GREY";
        type = (typeof raw).charAt(0).toUpperCase() + (typeof raw).slice(1);
      }

      const elapsed = Math.abs(Date.now() - msg.createdTimestamp);
      const embed = new D.Embed()
          .setColor(D.Util.resolveColor(color as ColorResolvable))
          .addField({name: "\\📥 Input", value: `\`\`\`js\n${text.truncate(text.clean(matches!.code), 1000).replaceAll("```", "")}\`\`\``})
          .setFooter({text: [
            `Type: ${type}`,
            `Evaluated in ${elapsed}ms.`,
            `Eval | \\©️${new Date().getFullYear()} ${msg.guild?.me?.displayName || msg.client.user?.username }`].join("\u2000•\u2000")});

      if (output.length > 1000) {
        await fetch("https://hastebin.com/documents", {
          method: "POST",
          body: output,
          headers: {"Content-Type": "text/plain"},
        }).then((res) => res.json())
            .then((json) => bin = "https://hastebin.com/" + json.key + ".js")
            .catch(() => null);
      }


      embed.addFields(...[
        {
          name: "\\📤 Output",
          value: output.length > 1000 ?
                `\`\`\`fix\nExceeded 1000 characters\nCharacter Length: ${output.length}\`\`\`` :
                `\`\`\`js\n${output}\n\`\`\``,
        },
        {name: "\u200b", value: `[\`📄 View\`](${bin}) • [\`📩 Download\`](${download})`},
      ].splice(0, Number(output.length > 1000) + 1));

      return msg.channel.send({embeds: [embed]});
    } catch (err) {
      const stacktrace = text.joinArrayAndLimit((err as Error).stack?.split("\n"), 900, "\n");
      const value = [
        "```xl",
        stacktrace.text,
            stacktrace.excess ? `\nand ${stacktrace.excess} lines more!` : "",
            "```",
      ].join("\n");
      const embed = new D.Embed()
          .setColor(D.Util.resolveColor("RED"))
          .setFooter({text: [
            `${(err as Error).name}`,
            `Evaluated in ${Math.abs(Date.now() - msg.createdTimestamp)}ms.`,
            `Eval | \\©️${new Date().getFullYear()} ${msg.guild?.me?.displayName || msg.client.user?.username}`].join("\u2000•\u2000")})
          .addFields(...[
            {name: "\\📥 Input", value: `\`\`\`js\n${text.truncate(text.clean(args.join(" ")), 1000, "\n...").replaceAll("```", "")}\`\`\``},
            {name: "\\📤 Output", value},
          ]);
      return msg.channel.send({embeds: [embed]});
    }
  },
}
