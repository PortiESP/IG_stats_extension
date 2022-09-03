


// Remove data
document.querySelector(".button__deleteData").onclick = () => {
    confirm("Are you sure that you want to remove all you data?") && chrome.storage.local.remove("userdata")
}