importScripts("./ngsw-worker.js");

self.addEventListener("sync", (event) => {
  if (event.tag === "post-data") {
    // call method
    event.waitUntil(addData());
  }
});
function addData() {
  //indexDb
  let obj = {
    name: "sync",
  };
  fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then(() => Promise.resolve(obj))
    .catch(() => Promise.reject());
}
