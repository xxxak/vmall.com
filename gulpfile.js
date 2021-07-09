const gulp = require('gulp');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
const jsmin = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const sprite = require('gulp.spritesmith');
const concat = require('gulp-concat');
const less = require('gulp-less');
const path = require('path');


// 1. gulp-htmlmin
// 用于压缩html文件
// $ cnpm i gulp-htmlmin -D
gulp.task('htmlmin', () => {
    return gulp.src('src/html/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist/html'));
});

// 2. gulp-cssmin
// 用于压缩css
// $ cnpm i gulp-cssmin -D
gulp.task('cssmin', function() {
    return gulp.src('src/styles/*.css')
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'));
});

// 3. gulp-uglify
// 用于压缩js
// $ cnpm i gulp-uglify -D
gulp.task('jsmin', function() {
    return gulp.src('src/js/*.js')
        .pipe(jsmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'));
});

// 4. gulp-imagemin
// 用于压缩图片
// $ cnpm i gulp-imagemin -D
gulp.task('imagemin', () => {
    return gulp.src('./src/img/*.png')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'));
});

// 5. gulp.spritesmith
// 用于精灵图制作
// $ cnpm i gulp.spritesmith -D
gulp.task('sprite', () => {
    return gulp.src('./dist/img/*.png')
        .pipe(sprite({
            imgName: 'sprite.png',
            cssName: 'sprite.css'
        }))
        .pipe(gulp.dest('./src/css'));
});

// 6. gulp-concat
// 连接文件(合并文件)
// $ cnpm i gulp-concat -D
gulp.task('concatjs', () => {
    return gulp.src(['./src/js/index.js', './src/js/news.js', './src/js/project.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./src/js'));
});

// 7. gulp-less
// 编译less
// $ cnpm i gulp-less -D
gulp.task('less', function() {
    return gulp.src('./src/styles/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./src/css'));
});

// 8. 文件监听
gulp.task('watchless', () => {
    // 监听所有的less文件 如果发生改变 则自动执行less任务
    gulp.watch('./src/styles/**/*.less', gulp.series('less'));
});

// 9. 自动项目构建
gulp.task('dev', () => {
    gulp.watch(['./src/styles/**/*.less', './src/html/*.html', './src/js/**/*.js'],
        gulp.series('htmlmin', 'concatjs', 'less', 'cssmin', 'jsmin'));
});