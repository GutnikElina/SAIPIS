document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("dataForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const preferenceText = document.getElementById("preference").value;
    const reviewText = document.getElementById("review").value;

    const fontSizeSelect = document.getElementById("font-size");
    const selectedFontSize =
      fontSizeSelect.options[fontSizeSelect.selectedIndex].value;

    let fontColor;
    const redButton = document.getElementById("red");
    const blueButton = document.getElementById("blue");
    const greenButton = document.getElementById("green");
    if (redButton.checked) {
      fontColor = "red";
    } else if (blueButton.checked) {
      fontColor = "blue";
    } else if (greenButton.checked) {
      fontColor = "green";
    }

    const linkHTML = `
     <div style="display: flex;">
       <a href="index.html" style="font-size: 1.3em;">Вернуться к заполнению формы</a>
     </div>
   `;

    const articleDiv = document.getElementById("article");
    articleDiv.innerHTML = linkHTML;

    const resultHTML = `
      <div style="display: flex; width: 900px; height: 400px; margin-top: 2em; margin-left: 20em;
      margin-right: 20em; padding: 1em; border-radius: 10px; border: 2px solid black;
      font-size: ${selectedFontSize}; color: ${fontColor};">
        Ваши предпочтения:<br>${preferenceText} <br>Ваш отзыв:<br>${reviewText}
      </div>
    `;

    articleDiv.insertAdjacentHTML("beforeend", resultHTML);
  });
});
