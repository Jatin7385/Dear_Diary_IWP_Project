$(document).ready(function () {
    console.log("Trigger Carousel");
    $(".carousel").carousel({
        interval: false,
    });
});

$("#save-ch").click(function () {
    $(".carousel").carousel("next");
});

$("#reset").click(function () {
    $(".carousel").carousel("prev");
});

$("#edit").click(function () {
    $(".carousel").carousel("next");
});

$("#save").click(function () {
    var name = document.getElementById;
    $(".carousel").carousel("prev");
});

var dpImg = "";
function importFileandPreview() {
    var dp = document.getElementById("dpimg");
    var file = document.querySelector("input[type=file]").files[0];
    var reader = new FileReader();

    reader.addEventListener(
        "load",
        function () {
            dp.src = reader.result;
            dpImg.push(reader.result);
        },
        false
    );

    if (file) reader.readAsDataURL(file);
}
