console.log("Fullmenu script...")

function setToolListener(param){
   location.href = `/pages/${param}`
}


const $items = [...document.querySelectorAll(".div__list_item")]


$items[0].onclick = () => setToolListener("datalist/datalist.html?notFollowingBack")
$items[1].onclick = () => setToolListener("datalist/datalist.html?iDontFollowBack")
$items[2].onclick = () => setToolListener("datalist/datalist.html?pendingRequests")
$items[3].onclick = () => setToolListener("datalist/datalist.html?blocked")
$items[4].onclick = () => setToolListener("datalist/datalist.html?devices")
$items[5].onclick = () => setToolListener("activity/activity.html?login")
$items[6].onclick = () => setToolListener("activity/activity.html?logout")