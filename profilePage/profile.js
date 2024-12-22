function goToHome() {
  window.location.href = `../index.html`;
}

const selectOption = document.getElementById("difficulty");
const btn = document.getElementById("btn");

selectOption.addEventListener("change", () => {
  console.log(selectOption.value);
  const a = sessionStorage.setItem("select", selectOption.value);
});
