function toggle() {
    var x = new Date(document.lastModified);
    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var d = days[x.getDay()];
    var mnt = months[x.getMonth()];
    var dt = x.getDate();
    var yr = x.getFullYear();
    var h = x.getHours();
    var m = x.getMinutes();
    if (m < 10) m = "0" + m;
    if (h < 10) h = "0" + h;
    if (h > 0 && h < 12) var t = h + ":" + m + " am";
    else if (h == 12) var t = 12 + ":" + m + " pm";
    else if (h > 12) var t = h - 12 + ":" + m + " pm";
    else var t = 12 + ":" + m + " am";
    document.getElementById("update").innerHTML =
        "Last updated on " + d + " " + mnt + " " + dt + ", " + yr + " | " + t;
}

function empty(obj) {
    if (obj.innerText == "What's on your mind? Type your thoughts here.")
        obj.innerHTML = "";
    obj.style.color = "black !important";
}

var x = new Date();
var msg = document.getElementById("created").innerHTML;
var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var d = days[x.getDay()];
var mnt = months[x.getMonth()];
var dt = x.getDate();
var yr = x.getFullYear();
var h = x.getHours();
var m = x.getMinutes();
if (m < 10) m = "0" + m;
if (h < 10) h = "0" + h;
if (h > 0 && h < 12) var t = h + ":" + m + " am";
else if (h == 12) var t = 12 + ":" + m + " pm";
else if (h > 12) var t = h - 12 + ":" + m + " pm";
else var t = 12 + ":" + m + " am";
document.getElementById("ctitle").innerHTML =
    months[x.getMonth()] + " " + x.getDate() + ", " + x.getFullYear();
document.getElementById("created").innerHTML =
    msg + " " + mnt + " " + dt + " " + yr + " at " + t;

document.getElementById("text-time").innerHTML = t;


var newImg= [];
function importFileandPreview() 
{
    var file= document.querySelector ('input[type=file]').files[0];
    var reader= new FileReader();

    reader.addEventListener("load", function () {
        var lastcarbtn= document.getElementById("last");
        var slide= 0 || lastcarbtn?.getAttribute ("data-bs-slide-to");
        var label= "Slide 0" || lastcarbtn?.getAttribute ("aria-label");

        var carbtn= document.createElement ('button');
        carbtn.type= 'button';        
        carbtn.setAttribute ("data-bs-target", "#cars-intro");
        carbtn.setAttribute ("data-bs-slide-to", slide);
        carbtn.setAttribute ("aria-label", label);

        $("#last" ).before(carbtn);
        slide++;
        lastcarbtn?.setAttribute ("data-bs-slide-to", slide);
        lastcarbtn?.setAttribute ("aria-label", "Slide " + slide+1);
        

        var cars= document.createElement ('div');
        cars.className= 'carousel-item';

        var img= document.createElement('img');
        img.className= 'd-block w-100';
        img.style.height= '92vh';
        img.src= reader.result;
        
        newImg.push(reader.result);

        cars.appendChild(img);
        $("#car-upl").before(cars);   
        
        $('.carousel').carousel(slide-1);
    }, false);

    if (file) 
        reader.readAsDataURL(file);
}