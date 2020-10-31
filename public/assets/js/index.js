$(document).ready(function () {
    // $(`#myModal`).on(`shown.bs.modal`, function () {
    //     $(`#myInput`).trigger('focus');
    // })
    console.log("check");
    $("#resistanceForm").hide();
    $("#cardioForm").hide();
    $("#training-type").change(function () {
        const type = $("#training-type").val();
        if (type === "Cardio") {
            $("#cardioForm").show();
            $("#resistanceForm").hide();
        } else {
            $("#cardioForm").hide();
            $("#resistanceForm").show();
        }
    })
})