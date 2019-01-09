$(document).ready(function() {
    // Container holds all of our events
    var container = $(".container");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handleDelete);
    $(document).on("click", "button.edit", handleEdit);
    var events;

    // This function does an API call to delete events
    function deleteEvent(id) {
      $.ajax({
        method: "DELETE",
        url: "/api/events/" + id
      })
        .then(function() {
          getEvents(eventsSelect.val());
        });
    }
  
    // Getting the initial list of events
    getEvents();
    // InitializeRows handles appending all of our constructed post HTML inside Container
    function initializeRows() {
      Container.empty();
      var eventsToAdd = [];
      for (var i = 0; i < events.length; i++) {
        eventsToAdd.push(createNewRow(events[i]));
      }
      Container.append(eventsToAdd);
    }
  
    // This function constructs an event's HTML
    function createNewRow(post) {
      var newEventCard = $("<div>");
      newEventCard.addClass("card");
      var newEventCardHeading = $("<div>");
      newEventCardHeading.addClass("card-header");
      var deleteBtn = $("<button>");
      deleteBtn.text("x");
      deleteBtn.addClass("delete btn btn-danger");
      var editBtn = $("<button>");
      editBtn.text("EDIT");
      editBtn.addClass("edit btn btn-default");
      var newEventTitle = $("<h2>");
      var newEventDate = $("<small>");
      var newEventCategory = $("<h5>");
      newEventCategory.text(post.category);
      newEventCategory.css({
        float: "right",
        "font-weight": "700",
        "margin-top":
        "-15px"
      });
      var newEventCardBody = $("<div>");
      newEventCardBody.addClass("card-body");
      var newEventBody = $("<p>");
      newEventTitle.text(post.title + " ");
      newEventBody.text(post.body);
      var formattedDate = new Date(post.createdAt);
      formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
      newEventDate.text(formattedDate);
      newEventTitle.append(newPostDate);
      newEventCardHeading.append(deleteBtn);
      newEventCardHeading.append(editBtn);
      newEventCardHeading.append(newEventTitle);
      newEventCardHeading.append(newEventCategory);
      newEventCardBody.append(newEventBody);
      newEventCard.append(newEventCardHeading);
      newPEventCard.append(newEventCardBody);
      newEventCard.data("event", event);
      return newEventCard;
    }
  
    // This function figures out which event we want to delete and then calls deleteEvent
    function handleEventDelete() {
      var currentEvent = $(this)
        .parent()
        .parent()
        .data("event");
      deleteEvent(currentEvent.id);
    }
  
    // This function figures out which event we want to edit and takes it to the Appropriate url
    function handleEventEdit() {
      var currentEvent = $(this)
        .parent()
        .parent()
        .data("event");
      window.location.href = "/search?event_id=" + currentEvent.id;
    }
  
    // This function displays a message when there are no events
    function displayEmpty() {
      Container.empty();
      var messageH2 = $("<h2>");
      messageH2.css({ "text-align": "center", "margin-top": "50px" });
      messageH2.html("No events yet , navigate <a href='/createNewEvent'>here</a> in order to create a new event.");
      Container.append(messageH2);
    }
  
  });
  