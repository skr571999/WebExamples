// // Will Git Error As User Action is Required to be done
// (async () => {
//   const dirHandle = await window.showDirectoryPicker();
//   for await (const entry of dirHandle.values()) {
//     console.log(entry.kind, entry.name);
//   }
// })();

const showBtn = document.querySelector("#show");

showBtn.addEventListener("click", async () => {
  const dirHandle = await window.showDirectoryPicker();
  for await (const entry of dirHandle.values()) {
    console.log(entry.kind, entry.name);
  }
});
