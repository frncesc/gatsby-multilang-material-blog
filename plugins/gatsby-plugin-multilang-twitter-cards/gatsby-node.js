/*eslint-env node*/

/**
 * Based on [gatsby-remark-twitter-cards](https://github.com/alessbell/gatsby-remark-twitter-cards)
 */

const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");
const twitterCard = require("wasm-twitter-card");
const { graphql } = require("gatsby/graphql");

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

function hexToRgb(hex) {
  const hexCode = hex.replace(/^#/, "");
  const bigint = parseInt(hexCode, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}


async function createCard(node, pluginOptions) {

  const {
    localizedTitles,
    localizedAuthors,
    defaultLanguage = 'en',
    background = '#000000',
    fontColor = '#ffffff',
    titleFontSize = 96,
    subtitleFontSize = 60,
    fontStyle = 'monospace',
    separator = '|',
    fontFile,
  } = pluginOptions;
  const post = node.frontmatter;
  if (!node.fields || node.fields.slug) {
    console.log('Markdown node without slug field!');
    return;
  }

  const lang = node.fields.lang || defaultLanguage;

  const output = path.join(
    "./public",
    lang,
    node.fields.slug,
    "twitter-card.jpg"
  );

  // Avoid repetitive calls
  if (fs.existsSync(output)) {
    console.log(`File already exists: ${output}`)
    return;
  }


  const title = localizedTitles[lang] || localizedTitles[defaultLanguage] || '';
  const author = localizedAuthors[lang] || localizedAuthors[defaultLanguage] || '';

  let formattedDetails = "";
  if (title || author) {
    formattedDetails =
      title && author ? `${title} ${separator} ${author}` : title || author;
  }

  const fontToUint8Array = fontFile
    ? fs.readFileSync(fontFile, null)
    : new Uint8Array();

  const buffer = twitterCard.generate_text(
    post.title,
    formattedDetails,
    titleFontSize,
    subtitleFontSize,
    hexToRgb(fontColor),
    fontFile ? 'custom' : fontStyle,
    fontToUint8Array
  );

  return Promise.all([generateBackground(background), writeTextToCard(buffer)])
    .then(([base, text]) => base.composite(text, 0, 0))
    .then(image =>
      image
        .writeAsync(output)
        .then(() => console.log("Generated Twitter Card: ", output))
        .catch(err => err)
    )
    .catch(console.error);
}

async function onPostBootstrap(_, pluginOptions) {

  console.log('XXXXXXXXXX')

  const {
    titleFontSize = 96,
    subtitleFontSize = 60,
  } = pluginOptions;

  validateFontSize(titleFontSize, "titleFontSize");
  validateFontSize(subtitleFontSize, "subtitleFontSize");

  const result = await graphql`
    query {
      allMdx {
        edges {
          node {
            fields {
              lang
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }`;

  if (result.errors) {
    throw result.errors;
  }

  return Promise.all(result.data.allMdx.edges.map(({ node }) => createCard(node, pluginOptions)))
    .then(cards => console.log(`${cards.length} twitter cards created`));

}

//exports.onCreateNode = onCreateNode;
exports.onPostBootstrap = onPostBootstrap;
