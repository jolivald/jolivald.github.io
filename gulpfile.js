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

const create = (type, title, ext) => {
  const slug = slugify(title, { lower: true, strict: true });
  let base = '';
  let path = slug;
  let excerpt = true;
  switch (type){
    case 'post':
      base = '_posts/';
      path = `${(new Date).toISOString().slice(0, -14)}-${slug}`;
      break;
    case 'page':
      base = '';
      excerpt: false;
      break;
    case 'project':
      base = 'projects/';
      break;
  }
  const stream = through.obj();
  stream.write(new File({
    cwd: '/',
    base: `/${base}`,
    path: `/${base}${path}.${ext}`,
    contents: Buffer.from(
`---
title: ${title}
slug: ${slug}
page_excerpts: ${excerpt}
layout: default
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
    choices: ['post', 'page', 'project']
  });
  const ext = await inquire({
    type: 'list',
    message: 'Use HTML or Markdown ?',
    choices: ['html', 'md']
  });
  const name = await inquire({
    type: 'input',
    message: `Please enter ${type} title :`
  });
  const confirm = await inquire({
    type: 'confirm',
    message: `Create ${type} ?`
  });
  return confirm && create(type, name, ext);
};

const defaultTask = done => {
  console.log('no default task');
  done();
};

exports.default = defaultTask;
exports.make = makeTask;