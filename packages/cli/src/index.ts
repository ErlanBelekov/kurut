import figlet from 'figlet';
import { Command } from 'commander';

console.log(figlet.textSync('Kurut CLI'));

const program = new Command();

program
  .version('1.0.0')
  .description(
    'Kurut CLI for database migrations, local database sync and introscpection'
  );

// Commands for @kurut/cli migrate
// Run migrations with no downtime
// Generate TS SQL files up / down for each migration
const migrate = program.command('migrate').description('Migrations');

// Fetch last migration and find diff between current state and last migration state
//
migrate
  .command('new')
  .description('Create a new migration')
  .action(() => {
    return;
  });

migrate
  .command('run')
  .description('Run migrations on the database')
  .action(() => {
    return;
  });

program
  .command('auto-gen')
  .description('Auto-generate Kurut TypeScript entities from database');

program.parse();
