const chalk = require('chalk');
const fs = require('fs');

const getNote = () => {
    console.log(chalk.red('getting Note'));
};

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title,
            body,
        });

        saveNotes(notes);
        console.log(chalk.green('Note added successfully'));
    } else {
        console.log(chalk.red('Note title taken'));
    }
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json', 'utf-8');
        const dataJSON = JSON.parse(dataBuffer);
        return dataJSON;
    } catch (err) {
        return [];
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => {
        !note.title === title;
    });

    console.log(notesToKeep);
};

module.exports = {
    getNote,
    addNote,
    removeNote,
};
