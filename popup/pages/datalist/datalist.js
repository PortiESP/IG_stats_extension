
const $list = document.querySelector(".div__list")
const $itemTemplate = document.querySelector(".template__listitem").content

let USERDATA = {}
chrome.storage.local.get("userdata", res => {
    USERDATA = res["userdata"]

    switch(location.search){ // Utility lists
        case "?notFollowingBack":
            createList(list1notIn2(USERDATA.following, USERDATA.followers))
            break
        case "?iDontFollowBack":
            createList(list1notIn2(USERDATA.followers, USERDATA.following))
            break
        case "?pendingRequests":
            createList(USERDATA.pendingFollowRequests)
            break
    }
})

// ===================[ Functions ]==========================>
function list1notIn2(list1, list2){ // Return items from 1 not in 2
    return list1.filter( user => !list2.includes(user) )
}


function createList(items){
    document.querySelector(".wrap h1").innerText += ` (${items.length})`
    items.map( user => {
        $itemTemplate.querySelector("a").innerText = user
        $itemTemplate.querySelector("a").href = "https://www.instagram.com/" + user
        $list.appendChild(document.importNode($itemTemplate, true))
        $list.lastElementChild.onclick = () => chrome.tabs.create( { url: "https://www.instagram.com/" + user } )
    })
}
// 