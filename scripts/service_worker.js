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


// ======================================================[ Listener ]==================>
chrome.runtime.onMessage.addListener( (message, sender, response) => {

    // DEBUG
    console.log("Message received:", message)
    // console.log("Message from:", sender)

    // Manage messages by subject
    switch (message.subject){
        
        case "ADD":
            USERDATA = { ...USERDATA, ...message.data }
            break

        default:
            console.warn("Subject not expected: ", message.subject)
            break

    }

    // Snapshoot
    chrome.storage.local.set({"userdata": USERDATA}).then(console.log("Data saved..."))

    // DEBUG
    console.log("User data: ", USERDATA)
} )