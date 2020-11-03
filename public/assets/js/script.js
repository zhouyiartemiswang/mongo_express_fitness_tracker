$(document).ready(function () {

    // Create a workout
    // $("#create-btn").on("click", function () {
    //     $.post("/api/create-workout", function(data, status) {
    //         console.log(data);
    //     });
    // });


    // Get all workouts and display in dropdown options
    $.get("/api/workout/all", function (data, status) {
        // console.log(data);
        data.forEach(function (workout) {
            // console.log(workout);
            $(".workout-name").append(`<option value="${workout._id}">${workout.day}<option>`);
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

    $("#resistanceForm").on("submit", function (event) {
        event.preventDefault();
        // console.log($(".workout-name").find(":selected").text());
        const workoutDay = $(".workout-name").find(":selected").text();
        // console.log($(".exercise-name").find(":selected").text());
        console.log(typeof $("#duration").val());
        const resistanceObj = {
            type: "Resistance",
            name: $(".exercise-name").find(":selected").text(),
            weight: $("#weights").val(),
            sets: $("#sets").val(),
            reps: $("#reps").val(),
            duration: $("#duration").val()
        }
        // console.log(resistanceObj);
        $.post("/api/add-exercise/" + workoutDay, resistanceObj, function (data, status) {
            console.log(status);
        });
    });

    $("#cardioForm").on("submit", function (event) {
        event.preventDefault();

        const workoutDay = $(".workout-name").find(":selected").text();
        const cardioObj = {
            type: "Cardio",
            name: $(".exercise-name").find(":selected").text(),
            distance: $("#weights").val(),
            duration: $("#duration").val()
        }
        
        $.post("/api/add-exercise/" + workoutDay, cardioObj, function (data, status) {
            console.log(status);
        });
    });


});