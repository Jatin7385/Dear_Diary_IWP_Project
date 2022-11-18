navigator.geolocation.getCurrentPosition(
    (data) => {
        $("#weather").text("Fetching Location...");
        const lat = data.coords.latitude;
        const long = data.coords.longitude;
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/forecast?units=metric&APPID=222905522bd2c16bfe46234ced76263f&lat=${lat}&lon=${long}`,
            method: "GET",
            success: function (data) {
                $("#weather").html(
                    `<div class="d-flex"><img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png" alt="${data.list[0].weather[0].icon}" crossorigin="anonymous" class="weather-img" /><div class="px-1 d-flex flex-column align-items-start"><span class="fs-7">${data.city.name}</span><span class="fw-normal pt-1">${data.list[0].main.temp} °C, ${data.list[0].weather[0].main}</span></div></div>`
                );
            },
        });
    },
    (error) => {
        $("#weather").text("Location permission needs to allowed");
    }
);
