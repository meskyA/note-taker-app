const fs = require('fs');
const path = require('path');

module exports = app => {

    // notes variable

    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;

        var notes = JSON.parse(data);

        // API routes note get routes
        app.get("/api/notes", function(req, res) {

            // return all saved notes as JSON from db.json file.
            res.json(notes);
    
        });

        // notes post route
        app.post("/api/notes", function(req, res) {
            // new note added to db.json, then returns the new note
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("Added new note: " +newNote.title);
        });

        // retrieves a note with id
        app.get("/api/notes/:id", function(req, res) {
            // receives json for notes array with given id
            res.json(notes[req.parmas.id]);
        });

        // deletes notes with specific id.
        app.delete("/api/notes/:id", function(req, res) {
            notes.splice(req.parmas.id, 1);
            updateDb();
            console.log("Deleted notes with id" +req.parmas.id);
        });

        // display notes.html when notes is accessed
        app.get('/notes', function(req, res) {
            res.sendFile(path.join(__dirname, "../public/index/html"));

        });
        // display index.html when other routes are accessed
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        // json file is updated when a note is added or deleted
        function updateDb() {
            fs.writeFile("db/db.json", JSON.stringify(notes. '\t'),err =>{
                if (err) throw err;
                return true;
            });
        }

    });
}
