console.log("Service worker start...")

// Saved data
let USERDATA = {
    path: undefined, // ""
    followers: undefined, // []
    following: undefined, // []
    blocked: undefined, // []
    pendingFollowRequests: undefined, // []
    restrictedAccounts: undefined, // []
    recentFollowRequests: undefined, // []
    recentlyUnfollowed: undefined, // []
    reelsTopics: undefined, // []
    reelsSentiments: undefined, // []
    addsInterests: undefined, // []
    loginActivity: undefined, // {}
    logoutActivity: undefined, // {}
    devices: undefined, // {}
    companiesWithMyData: undefined, // []
    monetizable: undefined, // true

}

// Load data
chrome.storage.local.get("userdata", res => {
    USERDATA = { ...USERDATA, ...res["userdata"] }
    console.log("Data loaded:", USERDATA)
})


// ======================================================[ Functions ]==================>

function setData(data){
    USERDATA = { ...USERDATA, ...data }
    // Snapshoot
    chrome.storage.local.set({"userdata": USERDATA}).then(console.log("Data saved..."))
}

function flushData(){
    USERDATA = {} 
    chrome.storage.local.remove("userdata")
}



// ======================================================[ Listener ]==================>
chrome.runtime.onMessage.addListener( (message, sender, response) => {

    // DEBUG
    console.log("Message received:", message)
    // console.log("Message from:", sender)

    // Manage messages by subject
    switch (message.subject){
        
        case "APPEND": // Append data to the USERDATA object
            if ( message.data.path || ( USERDATA.path && message.url.includes(USERDATA.path) ) ) setData(message.data)
            else console.warn("Path not found, data has not been set")
            break

        case "FETCH": // Send USERDATA to sender
            console.log("Data fetch")
            response(USERDATA)
            break

        case "FLUSH": // Delete USERDATA content
            flushData()
            break

        default:
            console.warn("Subject not expected: ", message.subject)
            break
        }
        

    // DEBUG
    console.log("User data: ", USERDATA)
} )