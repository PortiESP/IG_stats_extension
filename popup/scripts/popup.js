
function setToolListener(param){
    chrome.tabs.create({url: `popup/pages/${param}`})
    .then( tab => {
        console.log(tab)
        chrome.tabs.sendMessage( tab.id, { message: USERDATA } )
    })
}


// =====================================================================[ Setup ]================>

// First data fetch
chrome.runtime.sendMessage({subject: "FETCH"}, res => {
    USERDATA = res
    setSummaryStatus(USERDATA)
})

// Remove data btn
document.querySelector(".button__deleteData").onclick = () => {
    if ( confirm("Are you sure that you want to remove all you data?") ){
        chrome.runtime.sendMessage({subject: "FLUSH"}) // Delete data from service worker and storage
        USERDATA = {} // Remove data from popup global script
        setSummaryStatus(USERDATA) // Update data on popup GUI
    }
}

document.querySelectorAll(".div__stats_item")[0].onclick = () => setToolListener("datalist/datalist.html?notFollowingBack")
document.querySelectorAll(".div__stats_item")[1].onclick = () => setToolListener("datalist/datalist.html?myInterests")
document.querySelectorAll(".div__stats_item")[2].onclick = () => setToolListener("activity/activity.html?login")
