const form = document.querySelector("#json-form");
const input = document.querySelector("#byte64-input");
const output = document.querySelector("#json-output");
output.style.display = "none";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const base64EncodedString = input.value.trim();

  if (!base64EncodedString) {
    alert("Please enter a valid Base64 encoded JSON.");
    return;
  }

  try {
    const json = JSON.parse(atob(base64EncodedString));
    let html = "";
    let id = 0;

    for (const [key, value] of Object.entries(json)) {
      html += `<div class='keypairinput' id='keypair-${id}'>`;
      html += `<label for="KEY_${id}">KEY_${id}:</label>`;
      html += `<input type="text" name="KEY_${id}" id="KEY_${id}:" value="${key}">`;
      html += `<label for="VALUE_${id}">VALUE_${id}:</label>`;
      html += `<input type="text" name="VALUE_${id}" id="VALUE_${id}" value="${value}">`;
      html += `<button type="button" class="remove-btn" data-keypair-id="${id}"><ion-icon name="trash"></ion-icon></button><br>`;
      html += "</div>";
      id++;
    }

    output.innerHTML = `
      <h2>JSON Editor</h2>
      <form id="json-editor-form">
        ${html}
        <div id="encode-btn-section" class="row encode-btn-section">
        <button type="button" id="add-btn">
        <ion-icon class="add-kv-icon" name="add-circle-sharp"></ion-icon> Add Key-Value Pair</button>
        <input type="submit" value="Encode">
        </div>
      </form>
    `;

    const editorForm = document.querySelector("#json-editor-form");
    const addBtn = document.querySelector("#encode-btn-section");
    let nextId = id;
    output.style.display = "";
    addBtn.addEventListener("click", () => {
      const keyPairInput = document.createElement("div");
      keyPairInput.classList.add("keypairinput");
      keyPairInput.id = `keypair-${nextId}`;
      keyPairInput.innerHTML = `
        <label for="KEY_${nextId}">KEY_${nextId}:</label>
        <input type="text" name="KEY_${nextId}" id="KEY_${nextId}:" value="">
        <label for="VALUE_${nextId}">VALUE_${nextId}:</label>
        <input type="text" name="VALUE_${nextId}" id="VALUE_${nextId}" value="">
        <button type="button" class="remove-btn" data-keypair-id="${nextId}"><ion-icon name="trash"></ion-icon></button><br>
      `;

      editorForm.insertBefore(keyPairInput, addBtn);
      nextId++;
    });
    output.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-btn")) {
        const keypairId = e.target.dataset.keypairId;
        const keypair = document.querySelector(`#keypair-${keypairId}`);
        keypair.parentNode.removeChild(keypair);
      }
    });

    const jsonEditorForm = document.querySelector("#json-editor-form");
    jsonEditorForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(jsonEditorForm);
      const data = {};

      for (const [name, value] of formData.entries()) {
        if (name.startsWith("KEY_")) {
          data[value] = "";
        } else if (name.startsWith("VALUE_")) {
          data[data[name.replace("VALUE_", "KEY_")]] = value;
        }
      }

      const json = JSON.stringify(data);
      const base64EncodedJson = btoa(json);

      output.innerHTML += `
        <div id="output-json">
          <h2>Output Base64 Encoded JSON:</h2>
          <textarea class="form-control" name="encoded-json" id="encoded-json" cols="50" rows="5" readonly>${base64EncodedJson}</textarea><br>
        </div>
      `;
    });
  } catch (error) {
    alert("Invalid Base64 encoded JSON.");
  }
});
