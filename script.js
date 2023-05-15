const form = document.querySelector('#json-form');
const input = document.querySelector('#byte64-input');
const output = document.querySelector('#json-output');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const encodedJson = input.value.trim();
  if (!encodedJson) {
    alert('Please enter a valid Base64 encoded JSON.');
    return;
  }
  try {
    const decodedJson = atob(encodedJson);
    const jsonData = JSON.parse(decodedJson);

    let jsonHtml = '';
    let keyCount = 0;
    for (const [key, value] of Object.entries(jsonData)) {
      jsonHtml += `<div class='keypairinput'>`
      jsonHtml += `<label for="KEY_${keyCount}">KEY_${keyCount}:</label>`;
      jsonHtml += `<input type="text" name="KEY_${keyCount}" id="KEY_${keyCount}:" value="${key}">`;
      jsonHtml += `<label for="VALUE_${keyCount}">VALUE_${keyCount}:</label>`;
      jsonHtml += `<input type="text" name="VALUE_${keyCount}" id="VALUE_${keyCount}" value="${value}"><br>`;
      jsonHtml += `</div>`
      keyCount++;
    }

    output.innerHTML = `
      <h2>JSON Editor</h2>
      <form id="json-editor-form">
        ${jsonHtml}
        <br>
        <input type="submit" value="Encode">
      </form>
    `;

    const editorForm = document.querySelector('#json-editor-form');
    editorForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const newData = {};
      for (const [key, value] of new FormData(editorForm).entries()) {
        if (key.startsWith("KEY_")) {
          var valValue = value;
          newData[value] = '';
        }
        else if(key.startsWith("VALUE_")) {
          newData[valValue] = value;
        }
      }
      const newJsonData = JSON.stringify(newData);
      const newEncodedJson = btoa(newJsonData);

      output.innerHTML += `
        <div id="output-json">
          <h2>Output Base64 Encoded JSON:</h2>
          <textarea class="form-control" name="encoded-json" id="encoded-json" cols="50" rows="5" readonly>${newEncodedJson}</textarea><br>
        </div>
      `;
    });
  } catch (error) {
    alert('Invalid Base64 encoded JSON.');
  }
});
