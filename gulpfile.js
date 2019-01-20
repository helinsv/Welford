var     gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		cleanCSS     = require('gulp-clean-css'),
		rename       = require('gulp-rename'),
		browserSync  = require('browser-sync').create(),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglify');

gulp.task('browser-sync', ['styles', 'scripts'], function() {
		browserSync.init({
				server: {
						baseDir: "./app"
				},
				notify: false
		});
});

gulp.task('styles', function () {
	return gulp.src(
		'sass/*.sass', [''])
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(cleanCSS())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	return gulp.src([
		'./node_modules/jquery/dist/jquery.min.js'
		])
		.pipe(concat('libs.js'))
		.pipe(uglify()) //Minify libs.js
		.pipe(gulp.dest('./app/js/'));
});

gulp.task('css-libs', function() {
	return gulp.src([		
		'./node_modules/@fortawesome/fontawesome-free/css/all.css',
		'./node_modules/normalize.css/normalize.css',
		'./app/libs/animate/animate.css'		
		])
		.pipe(concat('libs.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('./app/css/'));		
});

gulp.task('fonts', function() {
	return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
	  .pipe(gulp.dest('./app/webfonts'))
  })

gulp.task('watch', function () {
	gulp.watch('sass/*.sass', ['styles']);
	gulp.watch('app/libs/**/*.js', ['scripts']);	
	gulp.watch('app/js/*.js').on("change", browserSync.reload);
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch', 'css-libs', 'fonts']);
