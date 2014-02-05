module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    uglify:
      prod:
        options:
          mangle:
            except: ['Spectra']
          report: 'gzip'
          compress:
            conditionals: true
            if_return: true
            booleans: true
            evaluate: true
            sequences: true
            properties: true
            join_vars: true
        files:
          'spectra.min.js': ['spectra.js']

    karma:
      ci:
        singleRun: true
        configFile: 'karma-dev.conf.js'
        coverageReporter:
          type: 'lcov'
          dir: 'test/coverage/'
      dev:
        singleRun: false
        configFile: 'karma-dev.conf.js'
        autoWatch: true
      prod:
        singleRun: true
        configFile: 'karma-prod.conf.js'

    coveralls:
      options:
        force: true
        coverage_dir: 'test/coverage/'

    jshint:
      all:
        options:
          curly: true
          eqeqeq: true
          es3: true
          immed: true
          indent: 2
          latedef: true
          noarg: true
          node: true
          noempty: true
          nonew: true
          strict: true
          trailing: true
          undef: true
          unused: true
        files:
          src: 'spectra.js'

  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-karma'
  grunt.loadNpmTasks 'grunt-karma-coveralls'

  grunt.registerTask 'test', ['jshint', 'karma:ci', 'uglify', 'karma:prod']
  grunt.registerTask 'build', ['uglify', 'karma:prod']
  grunt.registerTask 'default', ['jshint', 'karma:dev', 'watch']
  grunt.registerTask 'travis', ['test', 'coveralls']
