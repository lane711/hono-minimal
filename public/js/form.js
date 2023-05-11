//        Formio.builder(document.getElementById('builder'), {}, {});
var contentTypeComponents;

const contentType = window.location.href.split("/").pop();
console.log('contentType', contentType)

axios.get(`/api/form-components/${contentType}`).then((response) => {
  console.log(response.data);
  console.log(response.status);
  console.log(response.statusText);
  console.log(response.headers);
  console.log(response.config);

  Formio.icons = "fontawesome";
  // Formio.createForm(document.getElementById("formio"), {
  Formio.builder(document.getElementById("formio"), {
    components: response.data,
  }).then(function (form) {
    form.on("submit", function (submission) {
      console.log(submission);
    });
    form.on("change", async function (event) {
      $("#contentFormSaveButton").removeAttr("disabled");
      if (event.components) {
        contentTypeComponents = event.components;
        console.log("event ->", event);
      }
    });
  });
});

function onContentFormSave() {
  console.log("saving content type", contentTypeComponents);
  axios.post("/api/form-components",contentTypeComponents).then((response) => {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
}

