import { uploadImage } from "../api.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      Cтраница добавления поста
        <input
      type="text"
       >
       
         <button class="button" id="add-button">Добавить</button>
      
    
    </div>
  `;

    appEl.innerHTML = appHtml;

    document
      .getElementById("add-image-button")
      .addEventListener("click", () => {
        const uploadImageValue = document.getElementById(
          "uploade-image-button"
        );
        // console.log(uploadImageValue.value);
        uploadImage({ file: uploadImageValue.value });
      });

    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: "Описание картинки",
        imageUrl: "https://image.png",
      });
    });
  };

  render();
}
