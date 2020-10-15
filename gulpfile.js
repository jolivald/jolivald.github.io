const { src, dest } = require('gulp');
const prompt = require('gulp-prompt');
const through = require('through2');
const File = require('vinyl');
const slugify = require('slugify');

const promptPost = options => new Promise((resolve, reject) => {
  const stream = through.obj()
    .on('error', reject)
    .pipe(prompt.prompt({
      type: 'input',
      name: 'name',
      message: 'Please enter post name:'
    }, result => resolve(result)));
  stream.write('');
  stream.end();
  return stream;
});

const createPost = async () => {
  const date = (new Date).toISOString().slice(0, -14);
  const { name } = await promptPost({
    type: 'input',
    name: 'name',
    message: 'Please enter post name:'
  });
  const slug = slugify(name, { lower: true, strict: true });
  const stream = through.obj();
  stream.write(new File({
    cwd: '/',
    base: '/_posts/',
    path: `/_posts/${date}-${slug}.md`,
    contents: Buffer.from(
`---
title: ${name}
slug: ${slug}
---
`)
  }));
  stream.end();
  return stream.pipe(dest('./_posts/'));
};

const defaultTask = done => {
  console.log('no default task');
  done();
};

exports.default = defaultTask;
exports.createPost = createPost;