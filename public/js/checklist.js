// Get checklist value

$("#checklistform").on("submit", function(data) {
  event.preventDefault();
  let eventid = $("#eventid")
    .val()
    .trim();
  let parsedEventId = parseInt(eventid, 10);
  let checklistItem = {
    name: $("#checklistperson")
      .val()
      .trim(),
    itemText: $("#checklistinput")
      .val()
      .trim(),
    completed: false,
    eventId: parsedEventId
  };
  console.log(checklistItem);
  $.ajax("/api/checklists", {
    type: "POST",
    data: checklistItem
  }).then(function() {
    console.log("New event posted!");
    location.reload();
  });
});

$("#checklistbtn").on("click", function(event) {
  event.preventDefault();
  console.log("Clicked");
  let dataId = $(this).attr("data-id");
  let id = parseInt(dataId, 10);
  let completedState = $(this).attr("data-completed");
  console.log(completedState);
  completedState = 1;
  let newBtnObj = $(this).attr("data-completed", completedState);
  let newState = newBtnObj[0].dataset.completed;
  let parsedState = parseInt(newState, 10);

  // completedState.data("completed", true);
  let eventID = $(this).data("eventid");
  let updatedChecklistItem = {
    id: id,
    eventId: eventID,
    complete: parsedState
  };
  console.log(updatedChecklistItem);

  $.ajax({
      method: "PUT",
      url: "/api/checklists/" + eventID,
      data: updatedChecklistItem

  }).then(
      function(){
          console.log("Changed Devoured state to: " + parsedState);
          location.reload();
      }
  )
});
