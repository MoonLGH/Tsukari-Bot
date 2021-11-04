/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
const table = document.getElementById("tablePlaceHolder");
const query = document.querySelector("#search-input > input");
const slashParsed = JSON.parse(slash);
const textParsed = JSON.parse(decodeURIComponent(text));

if (type === "slash") {
  table.innerHTML = `<thead><tr>
    <th>Command</th>
    <th>Description</th>
    </tr></thead>`;
  for (let i = 0; i < slashParsed.length; i++) {
    if (slashParsed[i].name.toLowerCase().includes(search.toLowerCase())) {
      table.innerHTML += `<tbody><tr>
            <td data-label="Command">${capitalizeFirstLetter(slashParsed[i].name)}</td>
            <td data-label="Description">${slashParsed[i].description}</td>
            </tr></tbody>`;
    }
  }
} else if (type === "text") {
  table.innerHTML = `<thead><tr>
    <th>Usage</th>
    <th>Description</th>
    <th>Permission needed</th>
    <th>Alias</th>
    <th>Code</th>
    </tr></thead>`;
  for (let i = 0; i < textParsed.length; i++) {
    if (textParsed[i].name.toLowerCase().includes(search.toLowerCase()) || textParsed[i].alias.includes(search.toLowerCase())) {
      table.innerHTML += `<tbody><tr>
            <td data-label="Usage">${(textParsed[i].usage.replace(textParsed[i].name, capitalizeFirstLetter(textParsed[i].name))).replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</td>
            <td data-label="Description">${textParsed[i].description}</td>
            <td data-label="Permission Needed">${textParsed[i].other.permission.length !== 0 ? textParsed[i].other.permission.join(" & ") : "-"}</td>
            <td data-label="Alias">${textParsed[i].alias.length !== 0 ? capitalizeFirstLetterArray(textParsed[i].alias).join("/") : "-"}</td>
            <td data-label="Code"><a class="link" href="${generateCodeLink(textParsed[i])}">Code</a></td>
            </tr></tbody>`;
    }
  }
}

function generateCodeLink(code) {
  return `https://github.com/MoonLGH/Tsukari-Bot/blob/main/src/Discord/TextCommands/${code.folder}/${code.file}`;
}

// make when enter pressed on query do inputchange()
query.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    inputchange();
  }
});

function selectchange(element) {
  window.location.href = `?type=${element.value}&q=${search}`;
}


function inputchange() {
  window.location.href = `?type=${type}&q=${query.value}`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function capitalizeFirstLetterArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = capitalizeFirstLetter(arr[i]);
  }
  return arr;
}
