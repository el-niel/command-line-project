const { Command } = require('commander');
const program = new Command();
const notes = require('./note.js');

// adding a new command
program
    .command('add')
    .description('Add a new task')
    .option('--title <title>', 'Title of the task')
    .option('--body <body>', 'this is the body of the task')
    .action(function (options) {
        notes.addNote(options.title, options.body);
    });

// listing all command
program
    .command('list')
    .description('Listing all tasks')
    .option('--title <title>', 'Title of the task')
    .action(function (options) {
        notes.listNotes();
    });

// reading a command
program
    .command('read')
    .description('reading task')
    .option('--title <title>', 'Title of the task')
    .action(function (options) {
        notes.readNotes(options.title);
    });

//removing command
program
    .command('remove')
    .description('Removing task')
    .option('--title <title>', 'Title of the task')
    .action(function (options) {
        notes.removeNotes(options.title);
    });

program.parse();
