const gulp = require("gulp");
var os = require("os");
const open = require("gulp-open");
const { pipeline } = require("stream");

var app = "python.exe";

gulp.task("open-python-script", async () => {
  gulp.src("./app.sh").pipe(open());
});

gulp.task("watch-files", async () => {
  gulp.watch("./src/**/*.ts", gulp.series("open-python-script"));
});
