
function setToolListener(param){
    chrome.tabs.create({url: `pages/${param}`})
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

    document.querySelector(".div__summary a:nth-child(2)").href = "file://" + USERDATA.path + "followers_and_following/followers.html" 
    document.querySelector(".div__summary a:nth-child(3)").href = "file://" + USERDATA.path + "followers_and_following/following.html" 
    document.querySelector(".div__summary a:nth-child(4)").href = "file://" + USERDATA.path + "your_topics/your_reels_topics.html" 
    document.querySelector(".div__summary a:nth-child(5)").href = "file://" + USERDATA.path + "information_about_you/ads_interests.html" 
    document.querySelector(".div__summary a:nth-child(6)").href = "file://" + USERDATA.path + "login_and_account_creation/login_activity.html" 
    document.querySelector(".div__summary a:nth-child(7)").href = "file://" + USERDATA.path + "device_information/devices.html" 
    document.querySelector(".div__summary a:nth-child(8)").href = "file://" + USERDATA.path + "followers_and_following/pending_follow_requests.html" 
})

// Remove data btn
document.querySelector(".button__deleteData").onclick = () => {
    if ( confirm("Are you sure that you want to remove all you data?") ){
        chrome.runtime.sendMessage({subject: "FLUSH"}) // Delete data from service worker and storage
        USERDATA = {} // Remove data from popup global script
        setSummaryStatus(USERDATA) // Update data on popup GUI
    }
}

window.addEventListener("DOMContentLoaded", ()=>{
    document.querySelector(".svg__fullicon").onclick = () => setToolListener("fullmenu/fullmenu.html")
    
    document.querySelectorAll(".div__stats_item")[0].onclick = () => setToolListener("datalist/datalist.html?notFollowingBack")
    document.querySelectorAll(".div__stats_item")[1].onclick = () => setToolListener("datalist/datalist.html?myInterests")
    document.querySelectorAll(".div__stats_item")[2].onclick = () => setToolListener("activity/activity.html?login")

})
