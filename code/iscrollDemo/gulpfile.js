var gulp = require("gulp"),
    uglify = require("gulp-uglify");
gulp.task("minifyjs", function() {
	gulp.src(["*.js","!gulpfile.js","!server.js"])
	.pipe(uglify())
	.pipe(gulp.dest(""))
});
