
const $list = document.querySelector(".div__list")
const $itemTemplate = document.querySelector(".template__listitem").content

let USERDATA = {}
chrome.runtime.sendMessage({subject: "FETCH"}, res => {
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
        case "?myInterests":
            createList(USERDATA.addsInterests && USERDATA.reelsTopics || [...USERDATA.addsInterests, ...USERDATA.reelsTopics])
            break

        case "?blocked":
            createList(USERDATA.blocked || [...USERDATA.blocked])
            break

        case "?devices":
            createList(USERDATA.devices || [...USERDATA.devices])
            break

        case "?activity":
            createActivityList(USERDATA.loginActivity)
            break   
    }
})

// ===================[ Functions ]==========================>
function list1notIn2(list1, list2){ // Return items from 1 not in 2
    
    if (list1 === undefined || list2 === undefined) return undefined
    return (list1).filter( user => !list2.includes(user) )
}


function createList(items){

    if (items === undefined){
        $list.innerHTML = "<h2 class='h2__err'>Data not fetched</h2>"
        return false
    }
    else if (!items.length){
        $list.innerHTML = "<h2 class='h2__err'>Empty dataset</h2>"
        return false
    }

    document.querySelector(".wrap h1").innerText += ` (${items.length})`
    items.map( user => {
        $itemTemplate.querySelector("a").innerText = user
        $itemTemplate.querySelector("a").href = "https://www.instagram.com/" + user
        $list.appendChild(document.importNode($itemTemplate, true))
        $list.lastElementChild.onclick = () => chrome.tabs.create( { url: "https://www.instagram.com/" + user } )
    })
}


function createActivityList(items){
    const $card = document.createElement("div")
    $card.className = "div__activity_item"
    
}