module.exports = function(grunt) {
    'use strict';

    grunt.uadreamsFiles = {
        
    
        css:[]
    };

    const sass = require('node-sass');


    grunt.initConfig({
        sass: {
            options: {
                implementation: sass,
                // sourceMap: true
            },           
            dist: {
                files: {
                    'public/style.css': 'assets/css/style.scss'
                }
            }
        },
        
        watch: {
              
            css: {
                files: ['assets/css/*.scss'],
                tasks: ['sass']
            }
        },

      
        
    });

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('watchcss', ['watch:css']);


}