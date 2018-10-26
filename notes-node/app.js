const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes');

const title = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
} 
const body = {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
}

var argv = yargs
    .command('add', 'Add a new note', {
        title,
        body
    })
    .command('list', 'List all notes')
    .command('get', 'Read a note content', {
        title
    })
    .command('remove', 'Removes a note', {
        title
    })
    .help()
    .argv;
var command = argv._[0];

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);

    if(note) {
        console.log(`Note created: ${note.title}, ${note.body}`);
    } else {
        console.log(`Note already exists: ${argv.title}`);        
    }
} else if (command === 'remove') {
    var message = notes.removeNote(argv.title) ? 'Note was removed' : 'Note doesn\'t exists';
    console.log(message);
} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log('----------------------------------')
    console.log(`Printing ${allNotes.length} note(s)`);

    allNotes.forEach((note) => {
        console.log('----------------------------------');
        console.log(`Title: ${note.title}`);
        console.log(`Body: ${note.body}`);
    });
} else if (command === 'get') {
    var note = notes.getNote(argv.title);

    if(note) {
        console.log(`Note: ${note.title}, ${note.body}`);
    } else {
        console.log(`Note not found: ${argv.title}`);
    }
} else {
    console.log(`Command not found: ${command}`);
}