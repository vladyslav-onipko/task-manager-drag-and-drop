import { srcFolder, distFolder, config } from './config.js';

import gulp from 'gulp';
import htmlmin from'gulp-htmlmin';
import csso from 'gulp-csso';
import rename from 'gulp-rename';
import sync from 'browser-sync';
import { deleteAsync } from 'del';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import nunjucksRender from 'gulp-nunjucks-render';
import gulpSassCompiler from 'gulp-sass';
import sassCompiler from 'sass';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

const sass = gulpSassCompiler(sassCompiler);

sync.create();

const html = () => {
    return gulp
    .src(config.templates.src)
    .pipe(nunjucksRender({
        path: `${srcFolder}/pages/`
    }))
    .pipe(gulp.dest('./'))
    .pipe(htmlmin({
        collapseWhitespace: true
    }))
    .pipe(gulp.dest(distFolder));
};

const scripts = () => {
    return gulp
    .src(config.scripts.src)
    .pipe(webpackStream({
        output: {
            filename: 'core.bundle.js'
        },
        resolve: {
            extensions: ['.js'],
        },
        plugins: [
            new UglifyJSPlugin({
                sourceMap: true
            })
        ]
    }, webpack))
    .pipe(gulp.dest(config.scripts.dist));
};

const styles = () => {
    return gulp
    .src(config.styles.src)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(concat('core.css'))
    .pipe(csso())
    .pipe(rename({
        extname: '.bundle.css'
    }))
    .pipe(gulp.dest(config.styles.dist));
};

const clear = () => {
    return deleteAsync('dist');
}

const run = () => {
    sync.init({
        server: distFolder,
    });

    gulp.watch(config.templates.src, gulp.series(html)).on('change', sync.reload);
    gulp.watch([config.styles.src, config.styles.components, config.styles.general], gulp.series(styles)).on('change', sync.reload);
    gulp.watch([config.scripts.src, config.scripts.components, config.scripts.utils], gulp.series(scripts)).on('change', sync.reload);
};

export const build = gulp.series(clear, html, styles, scripts);
export const start = gulp.series(clear, html, styles, scripts, run);