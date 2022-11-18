document.getElementById("text-time").innerHTML = new Date().toLocaleTimeString(
    "en-in"
);
var newImg = [];
function importFileandPreview() {
    var file = document.querySelector("input[type=file]").files[0];
    var reader = new FileReader();
    reader.addEventListener(
        "load",
        async function () {
            var lastcarbtn = document.getElementById("last");
            var slide = 0 || lastcarbtn?.getAttribute("data-bs-slide-to");
            var label = "Loading Slide" || lastcarbtn?.getAttribute("aria-label");

            var carbtn = document.createElement("button");
            carbtn.type = "button";
            carbtn.setAttribute("data-bs-target", "#cars-intro");
            carbtn.setAttribute("data-bs-slide-to", slide);

            $("#last").before(carbtn);
            slide++;
            lastcarbtn?.setAttribute("data-bs-slide-to", slide);

            var cars = document.createElement("div");
            cars.className = "carousel-item";

            var img = document.createElement("img");
            img.className = "d-block w-100";
            img.style.height = "92vh";

            cars.appendChild(img);
            $("#car-upl").before(cars);

            $(".carousel").carousel(slide - 1);
            var imageReader = new FileReader();
            imageReader.addEventListener("load", () => {
                img.src = imageReader.result;
                newImg.push(imageReader.result);
            });
            imageReader.readAsDataURL(
                await BrowserImageResizer.readAndCompressImage(file, {
                    quality: 0.8,
                    maxWidth: 320,
                    maxHeight: 640,
                })
            );
        },
        false
    );

    if (file) reader.readAsDataURL(file);
}
$(document).ready(function () {
    $(".carousel").carousel({
        interval: 2000,
    });

    // To change mood
    $(".mood-btn > button").on("click", (e) => {
        $(".mood-btn > button.active").removeClass("active");
        $(e.target).addClass("active");
    });

    $("#text-body").on("click", (e) => {
        if (
            e.target.innerText ==
            "What's on your mind? Type your thoughts here."
        )
            e.target.innerText = "";
    });

    $("#save").on("click", () => {
        navigator.geolocation.getCurrentPosition((data) => {
            const lat = data.coords.latitude;
            const long = data.coords.longitude;
            $.ajax({
                url: `https://api.openweathermap.org/data/2.5/forecast?units=metric&APPID=222905522bd2c16bfe46234ced76263f&lat=${lat}&lon=${long}`,
                method: "GET",
                success: function (data) {
                    $("#locationN").text(data.city.name);
                    $("#weatherN").text(
                        `${data.list[0].main.temp} °C, ${data.list[0].weather[0].main}`
                    );
                    const mood = $(".mood-btn > button.active")
                        .attr("class")
                        ?.split("my-1 ")[1]
                        ?.split(" ")[0];
                    const title = $("#ctitle").text();
                    const weather = $("#weatherN").text();
                    const location = $("#locationN").text();
                    const newEntry =
                        $("#text-body").text() ==
                        "What's on your mind? Type your thoughts here."
                            ? undefined
                            : $("#text-body").text();
                    let old = [];

                    $("#editable p")
                        .toArray()
                        .forEach((el, idx) => {
                            old.push({
                                index: idx,
                                entry: el.innerText,
                                time: $(el).attr("data-time"),
                            });
                        });
                    const payload = {
                        mood,
                        title,
                        weather,
                        location,
                        newEntry,
                        oldEntry: old,
                        newImage: newImg,
                    };
                    $.ajax({
                        url: window.location.url,
                        method: "POST",
                        json: true,
                        data: payload,
                        success: function (response) {
                            window.location.reload();
                        },
                    });
                },
            });
        });
    });
});
