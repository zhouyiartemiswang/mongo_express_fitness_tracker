$(document).ready(function () {

    $.get("/api/view-workout", function (data, status) {
        // console.log(data);
        data.forEach(function (workout) {
            // console.log(workout);
            $(".workout-name").append(`<option value="${workout._id}">${workout.day}<option>`);
            $(".container").append(`<div class="container">
            <div class="row">
                <h2>${workout.day}</h2>
                <button class="btn btn-primary">Add Exercise</button>
            </div>
            </div>`);
            $(".container").append(`<div class="row exercise-row"></div>`);
            workout.exercises.forEach(function (exercise) {
                if (exercise.type === "Resistance") {
                    $(".exercise-row").append(`
                    <div class="col-sm-12 col-md-4">
                        <div class="card">
                            <div class="card-header">${exercise.name}</div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Type: Resistance</li>
                                <li class="list-group-item">Weight (lb): ${exercise.weight}</li>
                                <li class="list-group-item"># Sets: ${exercise.sets}</li>
                                <li class="list-group-item"># Reps: ${exercise.reps}</li>
                                <li class="list-group-item">Duration (min): ${exercise.duration}</li>
                            </ul>
                            <button class="btn btn-primary">Delete Exercise</button>
                        </div>
                    </div>`);
                } else {
                    $(".exercise-row").append(`
                    <div class="col-sm-12 col-md-4">
                        <div class="card">
                            <div class="card-header">${exercise.name}</div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Type: Cardio</li>
                                    <li class="list-group-item">Distance (mile): ${exercise.distance}</li>
                                    <li class="list-group-item">Duration (min): ${exercise.duration}</li>
                                </ul>
                                <button class="btn btn-primary">Delete Exercise</button>
                        </div>
                    </div>`);
                }
            });
            // console.log(workout._id, workout.day);
        });
    });

    // Create a workout
    $("#create-btn").on("click", function () {
        $.post("/api/create-workout", function (data, status) {
            console.log(data);
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