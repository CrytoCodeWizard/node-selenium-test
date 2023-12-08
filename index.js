const { Command } = require('commander');
const { fetchPage, fetchPageWithMetadata } = require("./fetch");

const program = new Command();

program
    .version('1.0.0')
    .description("A command-line program to fetch web pages.");

program
    .command('fetch <urls...>')
    .description('Fetch web pages and save them to disk.')
    .action(urls => {
        urls.forEach(url => fetchPage(url));
    });

program
    .command('fetch with metadata <urls...>')
    .description('Fetch web pages and save them to disk.')
    .action(urls => {
        urls.forEach(url => fetchPageWithMetadata(url));
    });

program.parse(process.argv);