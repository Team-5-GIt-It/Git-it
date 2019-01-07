$(document).ready(function() {
    // Gets an optional query string from our url (i.e. ?event_id=23)
    var url = window.location.search;
    var eventId;
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;
  
    // If we have this section in our url, we pull out the event id from the url In localhost:8080/search?event_id=1, eventId is 1
    if (url.indexOf("?event_id=") !== -1) {
      eventId = url.split("=")[1];
      getEventData(eventId);
    }
  
    // Getting jQuery references to the event name, host name, deate, time, location, and details
    var eventNameInput = $("#eventname");
    var hostNameInput = $("#hostname");
    var dateInput = $("date");
    var timeInput = $("time");
    var locationInput = $("location");
    var detailsInput = $("details");
    var eventForm = $("form");

// not sure how these factor into our app
    var postCategorySelect = $("#category");
    // Giving the postCategorySelect a default value
    postCategorySelect.val("Personal");
    // Adding an event listener for when the form is submitted
    $(eventForm).on("submit", function handleFormSubmit(event) {
      event.preventDefault();
      // Wont submit the post if we are missing an event name, host name, date, time, or location
      if (!eventNameInput.val().trim() || !hostNameInput.val().trim() || !dateInput.val().trim() || !timeInput.val().trim() || !locationInput.val().trim()) {
        return;
      }
      // Constructing a newEvent object to hand to the database
      var newEvent = {
        event_name: eventNameInput.val().trim(),
        host_name: hostNameInput.val().trim(),
        date: dateInput.val().trim(),
        time: timeInput.val().trim(),
        location: locationInput.val().trim(),
        details: detailsInput.val().trim(),
      };
  
      console.log(newEvent);
  
      // If we're updating a post run updateEvent to update an event
      // Otherwise run submitEvent to create a whole new event
      if (updating) {
        newEvent.id = eventId;
        updateEvent(newEvent);
      }
      else {
        submitEvent(newEvent);
      }
    });
  
    // Submits a new event and brings user to event page upon completion
    function submitEvent(Event) {
      $.event("/api/events/", Event, function() {
        window.location.href = "/event";
      });
    }
  
    // Gets post data for a post if we're editing
    function getEventData(id) {
      $.get("/api/events/" + id, function(data) {
        if (data) {
          // If this post exists, prefill our form with its data
          eventNameInput.val(data.event_name);
          hostNameInput.val(data.host_name);
          dateInput.val(data.date);
          timeInput.val(data.time);
          locationInput.val(data.location);
          detailsInput.val(data.details);
          
          // If we have an event with this id, set a flag for us to know to update the event when we hit submit
          updating = true;
        }
      });
    }
  
    // Update a given event, bring user to the events page when done
    function updateEvent(event) {
      $.ajax({
        method: "PUT",
        url: "/api/events",
        data: post
      })
        .then(function() {
          window.location.href = "/event";
        });
    }
  });
  