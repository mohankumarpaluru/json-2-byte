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
    for (const [key, value] of Object.entries(jsonData)) {
      // jsonHtml += `<label for="${key}">${key}:</label><br>`;
      // jsonHtml += `<input type="text" name="${key}" id="${key}" value="${value}"><br>`
      jsonHtml += `<label for="${key}">key:</label><br>`;
      jsonHtml += `<input type="text" name="${key}" id="${key}" value="${key}"><br>`;
      jsonHtml += `<label for="${value}">value:</label><br>`;
      jsonHtml += `<input type="text" name="${value}" id="${value}" value="${value}"><br>`;      
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
        newData[key] = value;
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
