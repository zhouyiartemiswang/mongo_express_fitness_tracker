$(document).ready(function () {

    // Create a workout
    // $("#create-btn").on("click", function () {
    //     $.post("/api/create-workout", function(data, status) {
    //         console.log(data);
    //     });
    // });


    // Get all workouts and display in dropdown options
    $.get("/api/workout/all", function (data, status) {
        data.forEach(function (workout) {
            console.log(workout);
            $("#workout-name").append(`<option id="${workout._id}">${workout.day}<option>`);
            // console.log(workout._id, workout.day);
        });
    });

    $("#cardioForm").hide();
    $("#resistanceForm").hide();
    $("#training-type").change(function () {
        const type = $("#training-type").val();
        if (type === "Cardio") {
            $("#cardioForm").show();
            $("#resistanceForm").hide();
        } else {
            $("#cardioForm").hide();
            $("#resistanceForm").show();
        }
    });

    // $("#resistanceForm").on("submit", function (event) {
    //     event.preventDefault();
    //     const resistanceObj = {
    //         _id: 
    //         name: 
    //     }
    // })


});