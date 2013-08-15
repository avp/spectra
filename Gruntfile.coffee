module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    jasmine:
      src: 'spectra.js'
      options:
        specs: 'test/**/*.js'

    watch:
      jasmine:
        files: ['*.js', 'test/**/*.js']
        tasks: ['jasmine']

  grunt.loadNpmTasks 'grunt-contrib-jasmine'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'test', ['jasmine']
  grunt.registerTask 'default', ['jasmine', 'watch']
