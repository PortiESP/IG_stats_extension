function setSummaryStatus(data){
    console.log("Setting data summary: ", data)

    // Check if path is set
    if (data.path) document.querySelector(".div__summary_message").style.display = "none"
    else if (data.path === undefined) document.querySelector(".div__summary_message").style.display = "flex"

    // Create value list
    const statusComputed = [ // Data shown in the popup summary in order
        data.followers ? (data.followers.length) : undefined,
        data.following ? (data.following.length) : undefined,
        data.reelsTopics && data.reelsSentiments ? !!(data.reelsTopics.length) && !!(data.reelsSentiments.length) : undefined,
        data.addsInterests ? !!(data.addsInterests.length) : undefined,
        data.loginActivity && data.logoutActivity ? !!(Object.keys(data.loginActivity).length) && !!(Object.keys(data.logoutActivity).length) : undefined,
        data.devices ? (Object.keys(data.devices).length) : undefined,
        data.pendingFollowRequests ? (data.pendingFollowRequests.length) : undefined
    ]

    console.log("Status computed: ", statusComputed)

    // Set values into simmary items
    const _1 = [...document.querySelectorAll(".div__summary_item")].map( (item, i) => {
        if(statusComputed[i]){
            item.childNodes[2].style.background = "green"
            item.childNodes[1].innerText = statusComputed[i]
        }else if (statusComputed[i] === undefined){
            item.childNodes[2].style.background = "gray"
            item.childNodes[1].innerText = "No data"
        }else{
            item.childNodes[2].style.background = "red"
            item.childNodes[1].innerText = "Error"
        }
    })

}