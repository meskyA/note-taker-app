const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");


 
// if (window.location.pathname === '/notes') {
//   noteTitle = document.querySelector('.note-title');
//   noteText = document.querySelector('.note-textarea');
//   saveNoteBtn = document.querySelector('.save-note');
//   newNoteBtn = document.querySelector('.new-note');
//   noteList = document.querySelectorAll('.list-container .list-group');


// // Show an element
// const show = (elem) => {
//   elem.style.display = 'inline';
// };

// // Hide an element
// const hide = (elem) => {
//   elem.style.display = 'none';
// };

// activeNote is used to keep track of the note in the textarea
const activeNote = {};

const getNotes = function() {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};

  // fetch('/api/notes', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
// saving note to the db
const saveNote = function(note) {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};

const deleteNote = function(id) {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE"
  })
};
// If an active note, display it, if not render empty input
const renderActiveNote = function() {
  hide(saveNoteBtn);

  if (activeNote.id) {
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

const handleNoteSave = function() {
  const newNote = {
    title: noteTitle.val(),
    text: noteText.value(),
  };
  saveNote(newNote);
  // then(() => {
    getAndRenderNotes();
    renderActiveNote();
  // });
};

// Delete the clicked note
const handleNoteDelete = function(event) {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  const note = $(this).data('id');
  // const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === note) {
    activeNote = {};
  }

  deleteNote(note)
    getAndRenderNotes();
    renderActiveNote();
};

// Sets the activeNote and displays it
const handleNoteView = function() {
  activeNote = $(this).data();
  // activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = function() {
  activeNote = {};
  renderActiveNote();
};

const handleRenderSaveBtn = function() {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};
// Render the list of note titles
const renderNoteList = function(notes) {
  $noteList.empty();

  // if (window.location.pathname === '/notes') {
  //   noteList.forEach((el) => (el.innerHTML = ''));
  // }

  const noteListItems = [];

  // returns html element with or without a delete button
  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];

    const $li = $("<li class='list-group-item'>").data(note);
    $li.data('id',i);

    const $span = $("<span>").text(note.title);
    const $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note' data-id="+i+">"
    );

    $li.append($span, $delBtn);
    noteListItems.push($li);
  }


  $noteList.append(noteListItems);
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = function() {
  return getNotes().then(function(data) {
    renderNoteList(data);
  });
};


$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// renders the initial list of notes

getAndRenderNotes();
