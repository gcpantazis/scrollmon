'use strict';

module.exports = function(grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'scrollmon.js'
      ]
    },
    clean: {
      build: ['*.min.js*']
    },
    uglify: {
      target: {
        options: {
          sourceMap: 'scrollmon.min.js.map'
        },
        files: {
          'scrollmon.min.js': ['scrollmon.js']
        }
      }
    }
  });

  grunt.registerTask('test', []);

  grunt.registerTask('default', [
    'clean',
    'jshint',
    'uglify'
  ]);
};