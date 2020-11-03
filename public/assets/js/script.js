$(document).ready(function () {
    // Hide both cardio and resistance form on loading
    $("#cardioForm").hide();
    $("#resistanceForm").hide();

    // Display all workouts in view page
    $.get("/api/view-workout", function (data, status) {
        console.log(data);
        data.forEach(function (workout) {
            $(".workout-name").append(`<option value="${workout._id}">${workout.day}<option>`);
            $(".container").append(`
            <div class="row">
                <h2>${workout.day}</h2>
                <button class="btn btn-primary">Add Exercise</button>
            </div>`);
            $(".container").append(`<div class="row"></div>`);

            workout.exercises.forEach(function (exercise) {
                if (exercise.type === "Resistance") {
                    $(".container").children().append(`
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
                                <button class="btn btn-primary delete-btn" data-id="${exercise._id}">Delete Exercise</button>
                            </div>
                        </div>`);
                } else {
                    $(".container").children().append(`
            
                        <div class="col-sm-12 col-md-4">
                            <div class="card">
                                <div class="card-header">${exercise.name}</div>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">Type: Cardio</li>
                                        <li class="list-group-item">Distance (mile): ${exercise.distance}</li>
                                        <li class="list-group-item">Duration (min): ${exercise.duration}</li>
                                    </ul>
                                    <button class="btn btn-primary delete-btn" data-id="${exercise._id}">Delete Exercise</button>
                            </div>
                        </div>`);
                }
            });
        });
    });

    // Create a workout
    $("#create-btn").on("click", function () {
        $.post("/api/create-workout", function (data, status) {
            console.log(data);
        });
    });

    // Delete an exercise
    $(".delete-btn").on("click", function () {
        console.log("clicked");
        const exerciseId = this.attr("data-id");
        console.log(exerciseId);
    });

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

        const workoutDay = $(".workout-name").find(":selected").text();
        const resistanceObj = {
            type: "Resistance",
            name: $(".exercise-name").find(":selected").text(),
            weight: $("#weights").val(),
            sets: $("#sets").val(),
            reps: $("#reps").val(),
            duration: $("#duration").val()
        }

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