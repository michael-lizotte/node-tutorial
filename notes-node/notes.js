const fs = require('fs');

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };
    var duplicateNotes = notes.filter((note) => note.title === title);

    if(duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    } else {
        return;
    }
};

var getAll = () => {
    return fetchNotes();
};

var getNote = (title) => {
    return (fetchNotes().filter((note) => note.title === title))[0];
};

var removeNote = (title) => {
    var notes = fetchNotes();
    var newNotes = notes.filter((note) => note.title !== title);
    saveNotes(newNotes);

    return notes.length !== newNotes.length;
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
}