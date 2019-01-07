$(document).ready(function() {
    // Getting a reference to the input field where user adds a new checklist
    var $newItemInput = $("input.new-item");
    // Our new todos will go inside the checklistContainer
    var $checklistContainer = $(".checklist-container");
    // Adding event listeners for deleting, editing, and adding checklist
    $(document).on("click", "button.delete", deleteChecklist);
    $(document).on("click", "button.complete", toggleComplete);
    $(document).on("click", ".checklist-item", editChecklist);
    $(document).on("keyup", ".checklist-item", finishEdit);
    $(document).on("blur", ".checklist-item", cancelEdit);
    $(document).on("submit", "#checklist-form", insertChecklist);
  
    // Our initial checklist array
    var checklist = [];
  
    // Getting todos from database when page loads
    getChecklist();
  
    // This function resets the checklist displayed with new checklist from the database
    function initializeRows() {
      $checklistContainer.empty();
      var rowsToAdd = [];
      for (var i = 0; i < checklist.length; i++) {
        rowsToAdd.push(createNewRow(checklist[i]));
      }
      $checklistContainer.prepend(rowsToAdd);
    }
  
    // This function grabs checklist from the database and updates the view
    function getChecklist() {
      $.get("/api/checklist", function(data) {
        checklist = data;
        initializeRows();
      });
    }
  
    // This function deletes a checklist when the user clicks the delete button
    function deleteChecklist(event) {
      event.stopPropagation();
      var id = $(this).data("id");
      $.ajax({
        method: "DELETE",
        url: "/api/checklist/" + id
      }).then(getChecklist);
    }
  
    // This function handles showing the input box for a user to edit a todo
    function editChecklist() {
      var currentChecklist = $(this).data("todo");
      $(this).children().hide();
      $(this).children("input.edit").val(currentChecklist.text);
      $(this).children("input.edit").show();
      $(this).children("input.edit").focus();
    }
  
    // Toggles complete status
    function toggleComplete(event) {
      event.stopPropagation();
      var checklist = $(this).parent().data("checklist");
      checklist.complete = !checklist.complete;
      updateChecklist(checklist);
    }
  
    // This function starts updating a checklist in the database if a user hits the "Enter Key" While in edit mode
    function finishEdit(event) {
      var updatedChecklist = $(this).data("checklist");
      if (event.which === 13) {
        updatedChecklist.text = $(this).children("input").val().trim();
        $(this).blur();
        updateChecklist(updatedChecklist);
      }
    }
  
    // This function updates a checklist in our database
    function updateChecklist(checklist) {
      $.ajax({
        method: "PUT",
        url: "/api/checklist",
        data: checklist
      }).then(getChecklist);
    }
  
    // This function is called whenever a todo item is in edit mode and loses focus
    // This cancels any edits being made
    function cancelEdit() {
      var currentChecklist = $(this).data("checklist");
      if (currentChecklist) {
        $(this).children().hide();
        $(this).children("input.edit").val(currentChecklist.text);
        $(this).children("span").show();
        $(this).children("button").show();
      }
    }
  
    // This function constructs a checklist-item row
    function createNewRow(checklist) {
      var $newInputRow = $(
        [
          "<li class='list-group-item checklist-item'>",
          "<span>",
          checklist.text,
          "</span>",
          "<input type='text' class='edit' style='display: none;'>",
          "<button class='delete btn btn-danger'>x</button>",
          "<button class='complete btn btn-primary'>✓</button>",
          "</li>"
        ].join("")
      );
  
      $newInputRow.find("button.delete").data("id", checklist.id);
      $newInputRow.find("input.edit").css("display", "none");
      $newInputRow.data("checklist", checklist);
      if (checklist.complete) {
        $newInputRow.find("span").css("text-decoration", "line-through");
      }
      return $newInputRow;
    }
  
    // This function inserts a new checklist into our database and then updates the view
    function insertChecklist(event) {
      event.preventDefault();
      var checklist = {
        text: $newItemInput.val().trim(),
        complete: false
      };
  
      $.post("/api/checklist", checklist, getChecklist);
      $newItemInput.val("");
    }
  });
  