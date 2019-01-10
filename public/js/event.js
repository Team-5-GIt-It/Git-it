// Function to Generate Secret Event Code
function createEventCode() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

$("#hostform").validate({
  submitHandler: function(form) {
    // Get values from form
    $("#hostform").click(function() {
      form.submit();
    });

    // Create New Host Object
    let newHost = {
      name: $("#hostname")
        .val()
        .trim(),
      event: $("#eventname")
        .val()
        .trim(),
      address: $("#address")
        .val()
        .trim(),
      city: $("#city")
        .val()
        .trim(),
      state: $("#state")
        .val()
        .trim(),
      zip: $("#zip")
        .val()
        .trim(),
      date: $("#date")
        .val()
        .trim(),
      timeStart: $("#time-start")
        .val()
        .trim(),
      timeEnd: $("#time-end")
        .val()
        .trim(),
      groupSize: $("#groupsize option:selected").val(),
      eventType: $("#eventtype option:selected").val(),
      attire: $("#attire option:selected").val(),
      description: $("#description")
        .val()
        .trim(),
      eventCode: createEventCode()
    };

    console.log(newHost);
    $.ajax("/api/events", {
      type: "POST",
      data: newHost
    }).then(function() {
      UIkit.modal("#formmodal").show();
      $("#modalcode").text(newHost.eventCode);
      $("#modalconfirm").on("click", function(event) {
        event.preventDefault();
        let pathname = "/event/" + newHost.eventCode;
        console.log(pathname);
        window.location.assign(pathname);
      });
      console.log("New event posted!");
      // location.reload();
    });

    // Function to Reset Form on Reset Click
    function resetForm() {
      $("#hostname")
        .val()
        .trim(),
        $("#eventname")
          .val()
          .trim(),
        $("#address")
          .val()
          .trim(),
        $("#city")
          .val()
          .trim(),
        $("#state")
          .val()
          .trim(),
        $("#zip")
          .val()
          .trim(),
        $("#date")
          .val()
          .trim(),
        $("#time-start")
          .val()
          .trim(),
        $("#time-end")
          .val()
          .trim(),
        $("#groupsize option:selected").val(),
        $("#eventtype option:selected").val(),
        $("#attire option:selected").val(),
        $("#description")
          .val()
          .trim();
    }
  }
});

$("#searchbar").keypress(function(event) {
  event.preventDefault();
  if (event.which == 13) {
    let searchCode = $("#searchinput")
      .val()
      .trim();
    let pathname = "/event/" + searchCode;
    console.log(pathname);
    window.location.assign(pathname);
  }
});

/////// Event handlers for the create and search buttons\\\\\\\\\
function createButtonClick() {
  window.location = "#Survey";
}
function searchButtonClick() {
  window.location = "#blur";
}
$("#createButton").on("click", function() {
  createButtonClick();
});
$("#searchButton").on("click", function() {
  searchButtonClick();
});
