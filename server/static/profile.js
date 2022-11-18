$(document).ready(function () {
    $(".carousel").carousel("pause");
    $("#save-ch").click(function () {
        if (!$("#newPass").val()) {
            $("#newPass").addClass("is-invalid");
            return;
        }
        $.ajax({
            url: "/api/updatePassword",
            method: "POST",
            json: true,
            data: {
                oldPass: $("#oldPass").val(),
                newPass: $("#newPass").val(),
            },
            success: async function (resp) {
                if (!resp.ok) $("#oldPass").addClass("is-invalid");
                else {
                    $("#newPass").addClass("is-valid");
                    await new Promise((r) => setTimeout(r, 5000));
                    window.location.reload();
                }
            },
            error: function () {
                $("#oldPass").addClass("is-invalid");
            },
        });
    });

    $("#reset").click(function () {
        $(".carousel-profile").carousel("prev");
    });

    $("#edit").click(function () {
        $(".carousel-profile").carousel("next");
    });

    $("#save").click(function () {
        $("#profileEdSuccess").addClass("d-none");
        $("#profileEdFailed").addClass("d-none");
        $.ajax({
            url: "/api/updateProfile",
            method: "POST",
            json: true,
            data: {
                name: $("#name-ed").val(),
                email: $("#email-ed").val(),
            },
            success: async function (resp) {
                if (!resp.ok) $("#profileEdFailed").removeClass("d-none");
                else {
                    $("#profileEdSuccess").removeClass("d-none");
                    await new Promise((r) => setTimeout(r, 5000));
                    window.location.reload();
                }
            },
            error: function () {
                $("#profileEdFailed").removeClass("d-none");
            },
        });
    });
    var interval;
    $("#delAcc").on("click", () => {
        $("#pass").removeClass("is-valid");
        $("#pass").removeClass("is-invalid");
        if (!$("#pass").val()) {
            $("#delInFeed").text("Your Password is required!");
            $("#pass").addClass("is-invalid");
            return;
        }
        const start = new Date().getTime();
        $("#pass").addClass("is-valid");
        $("#delAcc").attr("disabled", true);
        interval = setInterval(() => {
            $("#delFeed").text(`Your account will be deleted in ${
                10 - Math.floor((new Date().getTime() - start) / 1000)
            } seconds. Close this dialog to
        cancel deletion.`);
            if (new Date().getTime() - start >= 10000) {
                clearInterval(interval);
                $.ajax({
                    method: "POST",
                    json: true,
                    url: "/api/deleteAccount",
                    data: { password: $("#pass").val() },
                    success: async function (resp) {
                        if (!resp.ok) {
                            $("#pass").removeClass("is-valid");
                            $("#pass").addClass("is-invalid");
                            $("#delInFeed").text("You entered wrong password!");
                            $("#delAcc").attr("disabled", false);
                        } else {
                            $("#delFeed").text(
                                "Your account was successfully deleted. You would be redirected to login page in few seconds. Good Bye."
                            );
                            await new Promise((r) => setTimeout(r, 5000));
                            window.location.pathname = "/logout";
                        }
                    },
                    error: function () {
                        $("#pass").removeClass("is-valid");
                        $("#pass").addClass("is-invalid");
                        $("#delInFeed").text("Something went wrong!");
                        $("#delAcc").attr("disabled", false);
                    },
                });
            }
        }, 1000);
    });
    document
        .querySelector("#exampleModal")
        .addEventListener("hide.bs.modal", () => {
            clearInterval(interval);
            $("#pass").removeClass("is-valid");
            $("#pass").removeClass("is-invalid");
            $("#pass").val("");
            $("#delAcc").attr("disabled", false);
        });
});
async function importFileandPreview() {
    $("#photoSuccess").addClass("d-none");
    var dp = document.getElementById("dpimg");
    var file = document.querySelector("input[type=file]").files[0];

    var imageReader = new FileReader();
    imageReader.addEventListener("load", () => {
        dp.src = imageReader.result;
        $.ajax({
            url: "/api/updatePhoto",
            method: "POST",
            json: true,
            data: {
                picture: imageReader.result,
            },
            success: async function (resp) {
                $("#photoSuccess").removeClass("d-none");
                await new Promise((r) => setTimeout(r, 5000));
                window.location.reload();
            },
        });
    });
    imageReader.readAsDataURL(
        await BrowserImageResizer.readAndCompressImage(file, {
            quality: 0.9,
            maxWidth: 96,
            maxHeight: 96,
        })
    );
}
