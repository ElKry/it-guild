var gulp        = require('gulp'),
	sass        = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat      = require('gulp-concat'),
	uglify      = require('gulp-uglifyjs'),
	cssnano     = require('gulp-cssnano'),
	rename      = require('gulp-rename'),
	del         = require('del'),
	imagemin    = require('gulp-imagemin'),
	pngquant    = require('imagemin-pngquant'),
	cache       = require('gulp-cache'),
	autoprefixer= require('gulp-autoprefixer'),
	jade        = require('gulp-jade');

gulp.task('html', function(){
	return gulp.src(['app/jade/**/*.jade', '!app/jade/includes/**/*.jade'])
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('app'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});

//Сжатие js библиотек
gulp.task('scripts', function(){
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/bootstrap/js/bootstrap.min.js',
		'app/libs/owl-carousel/owl.carousel.min.js',
		'app/libs/magnific-popup/jquery.magnific-popup.min.js'
		])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

//Сжатие css библиотек
gulp.task('css-libs', ['sass'], function(){
	return gulp.src('app/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

//Очистка папки на проде
gulp.task('clean', function(){
	return del.sync('dist');
});

//Очистка кеша картинок (использовать вручную при косяках с картинками)
gulp.task('clear', function(){
	return cache.clearAll;
});

//Обработка картинок
gulp.task('img', function(){
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync', 'html', 'css-libs', 'scripts'], function(){
	gulp.watch('app/jade/**/*.jade', ['html']);
	gulp.watch('app/sass/**/*.sass', ['sass']);
	/*gulp.watch('app/.html', browserSync.reload);*/
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'sass', 'scripts', 'img'], function(){
	var buildHtml = gulp.src('app/html/**/*.html')
		.pipe(gulp.dest('dist/html'));

	var buildCss = gulp.src([
			'app/css/main.css',
			'app/css/libs.min.css'
		])
		.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*.js')
		.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/**/*.html')
		.pipe(gulp.dest('dist'));
});