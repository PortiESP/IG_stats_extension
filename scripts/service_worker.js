console.log("Service worker start...")

// Saved data
let USERDATA = {
    path: "",
    followers: [],
    following: [],
    blocked: [],
    pendingFollowRequests: [],
    restrictedAccounts: [],
    recentFollowRequests: [],
    reelsTopics: [],
    reelsSentiments: [],
    userInfo: {},
    userTown: "",
    addsInterests: [],
    loginActivity: [],
    logoutActivity: [],
    devices: [],
    companiesWithMyData: [],
    monetizable: undefined,

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