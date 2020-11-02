const slugify = require('slugify');

slugify.extend({ _: '-', '#': '-', '.': '-' });
const options = {
  lower: true,
  remove: /[*+~.()'"!:@#]/g,
};
const validExtension = ['pdf', 'jpg', 'png', 'gif'];
const stdName = (baseName, rev) => {
  const arryName = baseName.split('.');
  const extension = arryName.pop().toLowerCase();
  if (!validExtension.includes(extension)) {
    return { mimeType: 'invalid' };
  }
  const mimeType =
    extension === 'pdf' ? 'application/pdf' : `image/${extension}`;
  const theBase = arryName.join(' ');
  const newFileName = `${slugify(
    theBase,
    options
  )}_Rev_${rev.toUpperCase()}.${extension}`;
  const responseValues = {
    extension,
    theBase,
    newFileName,
    mimeType,
  };
  return responseValues;
};

module.exports = {
  stdName,
};
