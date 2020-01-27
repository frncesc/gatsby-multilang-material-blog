/*eslint-env node*/

/**
 * Based on [gatsby-remark-twitter-cards](https://github.com/alessbell/gatsby-remark-twitter-cards)
 */

const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");
const twitterCard = require("wasm-twitter-card");

const WIDTH = 1200;
const HEIGHT = 630;

async function writeTextToCard(buffer) {
  return await new Jimp({ data: buffer, width: WIDTH, height: HEIGHT });
}

async function generateBackground(background) {
  if (background.match(/[0-9A-Fa-f]{6}/g)) {
    return await new Jimp(WIDTH, HEIGHT, background);
  }
  return Jimp.read(background);
}

function validateFontSize(fontSize, fieldName) {
  if (
    isNaN(fontSize) ||
    parseInt(Number(fontSize)) != fontSize ||
    isNaN(parseInt(fontSize, 10))
  ) {
    throw new Error(`Please pass an integer as ${fieldName}`);
  }
}

function validateLocalizedObject(obj, fieldName) {
  if (typeof obj !== 'object' || Object.keys(obj).length < 1 || typeof obj[Object.keys(obj)[0]] !== 'string')
    throw new Error(`Please pass an object with strings defined for each language as ${fieldName}`);
}

function hexToRgb(hex) {
  const hexCode = hex.replace(/^#/, "");
  const bigint = parseInt(hexCode, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

async function createCard(
  node,
  reporter,
  {
    localizedTitles,
    localizedAuthors,
    defaultLanguage,
    background,
    fontColor,
    titleFontSize,
    subtitleFontSize,
    fontStyle,
    separator,
    fontFile,
    cardFileName,
  }) {

  const lang = (node.fields && node.fields.lang) || defaultLanguage;

  const slug = node.fields && node.fields.slug;
  if (!slug) {
    reporter.warn('Markdown node without slug field');
    return;
  }

  const title = node.frontmatter && node.frontmatter.title;
  if (!title) {
    reporter.warn(`Markdown node without title: ${slug} (${lang})`);
    return;
  }

  const output = path.join(
    "./public",
    lang,
    slug,
    cardFileName
  );

  if (fs.existsSync(output)) {
    reporter.verbose(`File ${output} already exists and will be reused.`)
    return;
  }

  const localizedTitle = localizedTitles[lang] || localizedTitles[defaultLanguage] || '';
  const localizedAuthor = localizedAuthors[lang] || localizedAuthors[defaultLanguage] || '';

  let formattedDetails = "";
  if (localizedTitle || localizedAuthor) {
    formattedDetails =
      localizedTitle && localizedAuthor ? `${localizedTitle} ${separator} ${localizedAuthor}` : localizedTitle || localizedAuthor;
  }

  const fontToUint8Array = fontFile
    ? fs.readFileSync(fontFile, null)
    : new Uint8Array();

  const buffer = twitterCard.generate_text(
    title,
    formattedDetails,
    titleFontSize,
    subtitleFontSize,
    hexToRgb(fontColor),
    fontFile ? 'custom' : fontStyle,
    fontToUint8Array
  );

  return Promise.all([generateBackground(background), writeTextToCard(buffer)])
    .then(([base, text]) => base.composite(text, 0, 0))
    .then(image => image.writeAsync(output))
    .then(() => reporter.info(`Created social card for ${lang}${slug}`));
}

const defaultPluginOptions = {
  localizedTitles: null,
  localizedAuthors: [],
  defaultLanguage: 'en',
  background: '#000000',
  fontColor: '#ffffff',
  titleFontSize: 96,
  subtitleFontSize: 60,
  fontStyle: 'monospace',
  separator: '|',
  fontFile: null,
  cardFileName: 'twitter-card.jpg',
};

async function onPostBootstrap({ getNodesByType, reporter }, pluginOptions) {

  pluginOptions = { ...defaultPluginOptions, ...pluginOptions };

  validateFontSize(pluginOptions.titleFontSize, 'titleFontSize');
  validateFontSize(pluginOptions.subtitleFontSize, 'subtitleFontSize');
  validateLocalizedObject(pluginOptions.localizedTitles, 'localizedTitles');
  // Author not required:
  // validateLocalizedObject(pluginOptions.localizedAuthors, 'localizedAuthors');

  const nodes = getNodesByType('Mdx').concat(getNodesByType('MarkdownRemark'));
  reporter.verbose(`Generating social cards for ${nodes.length} markdown nodes`);

  return Promise.all(nodes.map(node => createCard(node, reporter, pluginOptions)))
    .then(cards => reporter.info(`${cards.length} social cards created`))
    .catch(err => reporter.error(`Error creating social cards`, err));
}

exports.onPostBootstrap = onPostBootstrap;
