import { uploadImage } from "../api.js";
import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
          <div class="header-container"></div>
     
     <div class="form">
      <h3> Cтраница добавления поста</h3>
      <div class="form-inputs">
      <div class="upload-image-container"></div>
     <label> Опишите фотографию
        <textarea class="input textarea"
        rows="4"></textarea>
       </label>
         <button class="button" id="add-button">Добавить</button>
         </div>
      </div>
    
    </div>
  `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: appEl.querySelector(".header-container"),
    });

    renderUploadImageComponent({
      element: appEl.querySelector(".upload-image-container"),
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
        console.log(newImageUrl);
      },
    });

    // document
    //   .getElementById("add-image-button")
    //   .addEventListener("click", () => {
    //     const uploadImageValue = document.getElementById(
    //       "uploade-image-button"
    //     );
    //     // console.log(uploadImageValue.value);
    //     uploadImage({ file: uploadImageValue.value });
    //   });

    document.getElementById("add-button").addEventListener("click", () => {
      const areaText = document.querySelector("textarea");
      if (imageUrl === "") {
        alert("Загрузите фотографию");
        return;
      }
      if (areaText.value === "") {
        alert("Напишите описание фотографии");
        return;
      }
      function sanitizeText(text) {
        return text
          .replace(/<[^>]*>/g, "")
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      const sanitizedDescription = sanitizeText(areaText.value);
      onAddPostClick({
        imageUrl: imageUrl,
        description: sanitizedDescription,
      });
    });
  };

  render();
}

{
  /* <a href="https://learn.javascript.ru/">НаЖми!</a>; */
}
//  <a href="https://learn.javascript.ru/">НаЖми!</a>;
