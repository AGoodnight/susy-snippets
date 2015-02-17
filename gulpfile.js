var gulp = require('gulp'),

	// SCSS
	sass = require('gulp-sass'),
	prefix = require('gulp-autoprefixer'),
	watch = require('gulp-watch'),
	livereload = require('gulp-livereload'),
	using = require('gulp-using'),
	compass = require('gulp-compass'),

	// References
	sassPath = 'scss/main/*.scss'; // <-- path of the scss file that imports all my other scss files.



gulp.task('watch',function(){

	// I'm watching all the files in the directory, not just the global.scss which becomes my global.css
	gulp.watch(['scss/***/**/*.scss','index.html'],['sass','html']); // <-- then it runs the task 'sass' which will compile my scss to css

})

gulp.task('html' , function(){

	livereload.listen();
	return gulp.src('index.html')
			.pipe(livereload());

});

gulp.task('sass', function(){

	livereload.listen(); // <-- Starts livereload

	return gulp.src(sassPath)
		.pipe(using())
		.pipe(compass({
			css:'css',
			sass:'scss',
			require:['susy']
		}))
		.pipe(sass({

			// this lets my scss @import commands work properly
			includePaths:[
				'scss/main/partials/*.scss',
				'scss/main/vendor/*.scss',
				'scss/modules/*.scss'
			]

		})) // <-- this function compiles the scss to css
		// saves time
		.pipe(prefix('last 2 versions',{map:false})) // <-- Cross-Browser prefixing
		.pipe(gulp.dest('css')) // <-- it saves in this directory, relative to this file's location
		.pipe(livereload()); // <-- Refresh my browser
});

gulp.task('default',['watch']) // DO IT