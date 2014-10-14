module.exports = function(grunt) {

  // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ["build/*"],

        concat: {
            dist: {
                files: [
                    { src: [ "css/*.css" ], dest: "build/min.css" },
                    { src: ["js/angular.js", "js/*.js", "js/app.js"], dest: "build/min.js" },
                ]
            }
        },
        // uglify: {
        //     'build/min.js' : 'build/min.js' 
        // },

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'concat' /*, 'uglify'*/ ]);

};