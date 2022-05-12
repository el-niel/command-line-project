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

//read  notes
const readNotes = (title) => {
    const notes = loadNotes();
    const foundNotes = notes.find((note) => {
        return note.title === title;
    });

    if (!foundNotes) {
        console.log(chalk.red('note not found!!'));
    } else {
        console.log(chalk.blue('Your note'));
        console.log(chalk.green(`${foundNotes.title} : ${foundNotes.body}`));
    }
};

//listing all notes
const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue('Your notes'));
    const allNotes = notes.forEach((note) => {
        console.log(chalk.green(`${note.title} : ${note.body}`));
    });
};

const removeNotes = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => {
        return note.title !== title;
    });

    if (notes.length > notesToKeep) {
        console.log(chalk.red('Note not found'));
    } else {
        console.log(chalk.green('note removed'));
        saveNotes(notesToKeep);
    }
};

module.exports = {
    getNote,
    addNote,
    removeNotes,
    readNotes,
    listNotes,
};
