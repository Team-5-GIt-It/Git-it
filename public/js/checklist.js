// Get checklist value

$("#checklistform").on("submit", function(data) {
  event.preventDefault();
  let checklistItem = {
    name: $("#checklistperson")
      .val()
      .trim(),
    itemText: $("#checklistinput")
      .val()
      .trim(),
    completed: false
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
