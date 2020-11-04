$(document).ready(function () {

    // Hide both cardio and resistance form on loading
    $("#cardioForm").hide();
    $("#resistanceForm").hide();

    // Display all workouts with associated exercises in view page
    $.get("/api/view-workout", function (data, status) {

        // For each workout
        data.forEach(function (workout, index) {

            // Add workout day to select options
            $(".workout-name").append(`<option data-id="${workout._id}">${workout.day}<option>`);

            // Use workout day as workout header
            $(".container").append(`
            <div class="row header">
            <h2>${workout.day}</h2>`);

            $(".container").append(`<div id="row${index}" class="row"></div>`);

            // If a workout has exercises
            if (workout.exercises.length != 0) {

                // Render individual exercise to a card based on type of exercise
                workout.exercises.forEach(function (exercise) {

                    if (exercise.type === "Resistance") {
                        $(".container").children(`#row${index}`).append(`
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
                                    <button class="btn btn-secondary delete-btn" data-id="${exercise._id}" data-workout-id="${workout._id}">Delete Exercise</button>
                                </div>
                            </div>`);
                    } else {
                        $(".container").children(`#row${index}`).append(`
                
                            <div class="col-sm-12 col-md-4">
                                <div class="card">
                                    <div class="card-header">${exercise.name}</div>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">Type: Cardio</li>
                                        <li class="list-group-item">Distance (mile): ${exercise.distance}</li>
                                        <li class="list-group-item">Duration (min): ${exercise.duration}</li>
                                    </ul>
                                    <button class="btn btn-secondary delete-btn" data-id="${exercise._id}" data-workout-id="${workout._id}">Delete Exercise</button>
                                </div>
                            </div>`);
                    }
                });

            } 
            // If no exercises, display this card instead
            else {

                $(".container").children(`#row${index}`).append(`
                <div class="col-sm-12 col-md-4">
                    <div class="card">
                        <div class="card-body">
                            No exercises yet.
                        </div>
                    </div>
                </div>`);

            }
        });
    });

    // Create a workout when Create Workout button is clicked
    $("#create-btn").on("click", function () {
        $.post("/api/create-workout", function (data, status) {
            console.log(status);
        });
    });

    // Delete an exercise when Delete Exercise button is clicked
    $(document).on("click", ".delete-btn", function () {

        const exerciseId = $(this).attr("data-id");
        const workoutId = $(this).attr("data-workout-id");

        $.ajax({
            url: `/api/delete-exercise/${workoutId}/${exerciseId}`,
            type: "DELETE",
            success: function (data, status) {
                console.log(status);
                location.reload();
            }
        });

    });

    // Display type of form based on user choice
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

    // Post resistance form info to database when form is submitted
    $("#resistanceForm").on("submit", function () {

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

    // Post cardio form info to database when form is submitted
    $("#cardioForm").on("submit", function () {

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