//your code here
const imageContainer = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const para = document.getElementById("para");
const heading = document.getElementById("h");

let selectedImages = [];
let images = ["img1", "img2", "img3", "img4", "img5"];

// 🔀 Shuffle array
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// 🔄 Initialize images
function init() {
  imageContainer.innerHTML = "";
  para.textContent = "";
  selectedImages = [];

  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";

  // Pick one random image to duplicate
  const duplicate = images[Math.floor(Math.random() * images.length)];
  let finalImages = [...images, duplicate];

  shuffle(finalImages);

  finalImages.forEach((cls, index) => {
    const img = document.createElement("img");
    img.className = cls;
    img.dataset.id = cls;

    img.addEventListener("click", () => handleClick(img));
    imageContainer.appendChild(img);
  });
}

// 🖱️ Handle image click
function handleClick(img) {
  if (selectedImages.includes(img) || selectedImages.length === 2) return;

  img.classList.add("selected");
  selectedImages.push(img);

  resetBtn.style.display = "inline-block";

  if (selectedImages.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

// 🔁 Reset
resetBtn.addEventListener("click", () => {
  selectedImages.forEach(img => img.classList.remove("selected"));
  selectedImages = [];
  para.textContent = "";
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";
});

// ✅ Verify
verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  if (
    selectedImages[0].dataset.id ===
    selectedImages[1].dataset.id
  ) {
    para.textContent = "You are a human. Congratulations!";
  } else {
    para.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

// 🚀 On page load
init();
