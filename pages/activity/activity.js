console.log("Account activity...")

const $template = document.querySelector(".template__activityitem").content
const $list = document.querySelector(".div__list")
const itemslist = []

let USERDATA = {}
chrome.storage?.local.get("userdata", res => {
    USERDATA = res["userdata"]

    switch(location.search){
        case "?login":
            createList(USERDATA.loginActivity)
        break
        case "?logout":
            createList(USERDATA.logoutActivity)
        break
    }

})



// ==========================[ functions ]=====================================>
function createList(items){

    console.log("Creating list of:" , items)

    document.querySelector(".wrap h1").innerText = `ACTIVITY ${location.search === "?login"? "LOGIN": "LOGOUT"} list (${items.length})`
    const addressList = []
    const addressCache = {}

    // Unique IPs
    items.map( ({ip}) => {
        if (!addressList.includes(ip)) addressList.push(ip)
    } )


    
    // Populate
    items.map( ({cookie, ip, lang, time, userAgent}) => {
        $template.querySelector(".div__activity_item").title = ip
        const fields = [...$template.querySelectorAll(".span__data")]
        fields[0].innerText = cookie
        fields[1].innerText = ip
        fields[2].innerText = lang
        fields[3].innerText = time
        fields[4].innerText = userAgent
        $list.appendChild(document.importNode($template, true))
        const $elem = $list.lastElementChild
        $list.lastElementChild.onclick = e => {
            fetchIp(ip, ()=>fillAddressData($elem))
        }
        itemslist.push($list.lastElementChild)
    })


    const fillAddressData = (item) => {
        console.log("Setting data for", item)
        item.querySelector(".div__blur").style.filter = "none"
        item.querySelector(".div__blur").style.pointerEvents = "all"
        item.querySelector(".div__message").style.display = "none"
        item.querySelector("h2").innerText = item.title
        item.querySelector(".span__data.isp").innerText = addressCache[item.title].isp
        item.querySelector(".span__data.loc").innerText = `${addressCache[item.title].regionName}, ${addressCache[item.title].city}`
        item.querySelector(".a__address.shodan").href = `https://www.shodan.io/search?query=${addressCache[item.title].query}`
        item.querySelector(".a__address.maps").href = `https://www.google.es/maps/place/${addressCache[item.title].lat},${addressCache[item.title].lon}`     
    }

    // Fetch data
    const fetchIp = (ip, cbk) => {

        console.log("Fetching data for: ", ip)
        fetch(`http://ip-api.com/json/${ip}`)
        .then( res => res.json() )
        .then( res => { 
            // Response callback
            addressCache[ip] = res
            console.log("Data fetched: ", res)
            cbk()
        })
        
    }
    
    

}