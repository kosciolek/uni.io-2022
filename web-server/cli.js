const { PrismaClient } = require('@prisma/client');
const { program } = require('commander');
const chalk = require('chalk');

const formatReport = ({ id, reporterId, reason, post }) =>
  `  ${chalk.red('Post ID')}: ${post.id}
  ${chalk.red('Report ID')}: ${id}
  ${chalk.red('Reporter ID')}: ${reporterId}
  ${chalk.red('Report reason')}: ${reason}
  ${chalk.green('Title')}: ${post.title}
  ${chalk.green('Author')}: ${post.authorNickname}
  ${chalk.green('Short description')}: ${post.shortDescription}
  ${chalk.green('Phone')}: ${post.phone}
  ${chalk.green('Email')}: ${post.email}
  ${chalk.green('Address')}: ${post.address}`;

const main = async () => {
  const client = new PrismaClient();

  /*   await client.postReport.create({
    data: {
      reason: 'oszust',
      reporterId: 'Asdad',
      postId: 2,
    },
  });

  await client.postReport.create({
    data: {
      reason: 'oszust213',
      reporterId: 'Asdad',
      postId: 2,
    },
  }); */

  const reports = program.command('reports');

  reports
    .command('view')
    .description('Allows to view reports and posts reported by users.')
    .action(async () => {
      const reports = await client.postReport.findMany({
        include: {
          post: true,
        },
      });

      console.log(`${reports.length} post reports:\n`);
      const formatted = reports.map((report) => formatReport(report));
      const separator = '\n--------------------\n';
      console.log(formatted.join(separator));
    });

  reports
    .command('delete')
    .description('Allows to delete reports made by users.')
    .requiredOption(
      '-i, --id <reportId>',
      'The id of the report to be deleted.',
    )
    .action(async ({ id }) => {
      await client.postReport.delete({
        where: {
          id: Number(id),
        },
      });
    });

  console.log(chalk.yellow('Deleted.'));

  program.parse();
};

main();
