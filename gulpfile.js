let $, browserSync, fs, getYamlData, gulp, reload, yaml;

//noinspection NodeJsCodingAssistanceForCoreModules
fs = require('fs');
gulp = require('gulp');
yaml = require('js-yaml');
browserSync = require('browser-sync');
reload = browserSync.reload;

$ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

getYamlData = (function () {
  return function (lang) {
    return $.data(function () {
      let commonData, data, myModelPath, pageData;
      myModelPath = './src/yaml/' + lang + '.yml';
      pageData = yaml.safeLoad(fs.readFileSync(myModelPath));
      commonData = yaml.safeLoad(fs.readFileSync('./src/yaml/_common.yml'));
      data = Object.assign({}, commonData, pageData);
      data.lang = lang;
      return data;
    });
  };
})();

gulp.task('pug:build', function () {
  let destination, i, lang, len, ref, results;
  ref = ['ja'];
  results = [];
  for (i = 0, len = ref.length; i < len; i++) {
    lang = ref[i];
    destination = lang === 'ja' ? 'public' : 'public/' + lang;
    results.push(gulp.src(['src/*.pug']).pipe($.plumber()).pipe(getYamlData(lang)).pipe($.pug())
      .pipe(gulp.dest(destination)));
  }
  return results;
});

gulp.task('watch', ['pug:build', 'browser-sync'], function () {
  gulp.watch('./src/**/*.pug', ['pug:build', reload]);
  return gulp.watch('./src/yaml/*.yml', ['pug:build', reload]);
});

gulp.task('browser-sync', function () {
  return browserSync.init({
    proxy: 'localhost:8080'
  });
});
