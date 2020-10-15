const { src, dest } = require('gulp');
const prompt = require('gulp-prompt');
const through = require('through2');
const File = require('vinyl');
const slugify = require('slugify');

const inquire = options => new Promise((resolve, reject) => {
  const stream = through.obj()
    .on('error', reject)
    .pipe(prompt.prompt(
      { ...options , name: 'result' }, 
      ({ result }) => resolve(result)
    ));
  stream.write('');
  stream.end();
  return stream;
});

const create = (type, title) => {
  let name = title;
  let base = '';
  if (type === 'post'){
    const date = (new Date).toISOString().slice(0, -14);
    name = `${date}-${title}`;
    base = '_posts/';
  }
  const slug = slugify(name, { lower: true, strict: true });
  const stream = through.obj();
  stream.write(new File({
    cwd: '/',
    base: `/${base}`,
    path: `/${base}${slug}.md`,
    contents: Buffer.from(
`---
title: ${name}
slug: ${slug}
---
`)
  }));
  stream.end();
  return stream.pipe(dest(`./${base}`));
};


const makeTask = async () => {
  const type = await inquire({
    type: 'list',
    message: 'What type of resource to make ?',
    choices: ['page', 'post']
  });
  const name = await inquire({
    type: 'input',
    message: `Please enter ${type} title :`
  });
  const confirm = await inquire({
    type: 'confirm',
    message: `Create ${type} ?`
  });
  return confirm && create(type, name);
};

const defaultTask = done => {
  console.log('no default task');
  done();
};

exports.default = defaultTask;
exports.make = makeTask;