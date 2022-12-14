
console.log("Content script...")

const page = location.pathname.split("/").slice(-1)[0]

// ==========================[ Functions ]================================================>
function isReportsFile(){
    return [
        !!document.querySelector("body > div > div > div > div:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(2) > img")
    ].every(i=>i)
}

function getSelectorList(selector){
    return [...document.querySelectorAll(selector)].map( node => node.innerText )
}


// ==========================[ Message system ]================================================>
function setData(data){
    sendMessage({subject: "APPEND", data, url: location.pathname})
}

function sendMessage(data, callback){
    console.log("Sending message: ", data)
    chrome.runtime.sendMessage(data, callback)
}
// ==========================[ Fetch data ]================================================>

if (isReportsFile()){

    console.log("Detected reports page: ", page)

    switch(page){

        case "index.html":
            const path = location.pathname.replace(location.pathname.split("/").slice(-1), "")
            setData({ path })
            break
        
        case "followers.html":
            setData({ followers: getSelectorList("a[href*='www.instagram.com/']") })
            break
            
        case "following.html":
            setData({ following: getSelectorList("a[href*='www.instagram.com/']") })
            break
            
        case "your_reels_topics.html":
            setData({ reelsTopics: getSelectorList("div[role=main] table tr td:nth-child(2) > div") })
            break

        case "your_reels_sentiments.html":
            setData({ reelsSentiments: getSelectorList("div[role=main] table tr td:nth-child(2) > div") })
            break

        case "ads_interests.html":
            setData({ addsInterests: getSelectorList("div[role=main] table tr td:nth-child(2) > div") })
            break

        case "devices.html":
            setData( {
                devices: [...document.querySelectorAll("div[role=main] table tbody")].map( dev => {
                                return {
                                    deviceId: dev.querySelector("tr:nth-child(1) td:nth-child(2) > div").innerText,
                                    lastLogin: dev.querySelector("tr:nth-child(2) td:nth-child(2)").innerText,
                                    userAgent: dev.querySelector("tr:nth-child(3) td:nth-child(2) > div").innerText
                                }
                            } )
            } )
            break

        case "blocked_accounts.html":
            setData({ blocked: getSelectorList("a[href*='www.instagram.com/']") })
            break
            
        case "eligibility.html":
            setData({ monetizable: document.querySelector("div[role=main] table tr:nth-child(2) td:nth-child(2) > div").innerText === "Eligible" })
            break 

        case "pending_follow_requests.html":
            setData({ pendingFollowRequests: getSelectorList("a[href*='www.instagram.com/']") })
            break

        case "recent_follow_requests.html":
            setData({ recentFollowRequests: getSelectorList("a[href*='www.instagram.com/']") })
            break

        case "restricted_accounts.html":
            setData({ restrictedAccounts: getSelectorList("a[href*='www.instagram.com/']") })
            break

        case "recently_unfollowed_accounts.html":
            setData({ recentlyUnfollowed: getSelectorList("a[href*='www.instagram.com/']") })
            break

        case "advertisers_using_your_activity_or_information.html":
            setData({ companiesWithMyData: getSelectorList("tbody tr td:first-child strong") })
            break

        case "login_activity.html":
            setData(
                {
                    loginActivity:[...document.querySelectorAll("div[role=main] > div tbody")].map( log=> {
                        const fields = [...log.querySelectorAll("tr td:nth-child(2)")].map(e => e.innerText)
                        return {
                            cookie: fields[0],
                            ip: fields[1],
                            lang: fields[2],
                            time: fields[3],
                            userAgent: fields[4],
                        }
                    })    
                }
            )
            break

        case "logout_activity.html":
            setData(
                {
                    logoutActivity:[...document.querySelectorAll("div[role=main] > div tbody")].map( log=> {
                        const fields = [...log.querySelectorAll("tr td:nth-child(2)")].map(e => e.innerText)
                        return {
                            cookie: fields[0],
                            ip: fields[1],
                            lang: fields[2],
                            time: fields[3],
                            userAgent: fields[4],
                        }
                    })    
                }
            )
            break
                
    }
}
