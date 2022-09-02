
console.log("hello world")


// Functions 
function getUsersFromList(){
    return [...document.querySelectorAll("a[href*='www.instagram.com/']")].map( user => user.innerText )
}


const page = location.pathname.split("/").slice(-1)[0]
console.log(page)

switch(page){
    case "followers.html":
        console.log(getUsersFromList())
    case "following.html":
        console.log(getUsersFromList())
}