const distFolder = './docs';
const srcFolder = './src';

const config = {
    templates: {
        src: `${srcFolder}/pages/*.njk`,
        dist: distFolder,
    },

    styles: {
        src: `${srcFolder}/scss/*.scss`,
        components: `${srcFolder}/scss/components/*.scss`,
        general: `${srcFolder}/scss/general/*.scss`,
        dist: `${distFolder}/css/`,
    },

    scripts: {
        src: `${srcFolder}/js/*.js`,
        components: `${srcFolder}/js/components/*.js`,
        utils: `${srcFolder}/js/utils/*.js`,
        dist: `${distFolder}/js/`,
    }
};

export default config;

export {
    srcFolder,
    distFolder,
    config,
};