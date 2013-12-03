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

    jshint:
      all:
        options:
          curly: true
          eqeqeq: true
          indent: 2
          undef: true
          unused: true
          strict: true
          trailing: true
          node: true
        files:
          src: 'spectra.js'

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
  grunt.loadNpmTasks 'grunt-contrib-jshint'

  grunt.registerTask 'test', ['jshint', 'jasmine:dev', 'uglify', 'jasmine:prod']
  grunt.registerTask 'build', ['uglify', 'jasmine:prod']
  grunt.registerTask 'default', ['jasmine:dev', 'watch']
