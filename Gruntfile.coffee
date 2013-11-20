module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    uglify:
      prod:
        options:
          mangle:
            except: ['Spectra']
        files:
          'spectra.min.js': ['spectra.js']

    jasmine:
      dev:
        src: 'spectra.js'
        options:
          specs: 'test/**/*.js'
      prod:
        src: 'spectra.min.js'
        options:
          specs: 'test/**/*.js'

    watch:
      jasmine:
        files: ['*.js', 'test/**/*.js']
        tasks: ['jasmine:dev']
      uglify:
        files: ['spectra.js']
        tasks: ['uglify']

  grunt.loadNpmTasks 'grunt-contrib-jasmine'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'test', ['jasmine:dev', 'uglify', 'jasmine:prod']
  grunt.registerTask 'default', ['uglify', 'jasmine:dev', 'watch']
