/*global module */
module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        uglify: {
            options: {
                preserveComments: false,
                banner: "/* <%= pkg.name %> v<%= pkg.version %> (<%= pkg.repository.url %>) */\n"
            },
            query: {
                files: {
                    "<%= pkg.name %>-<%= pkg.version %>.min.js" : [ "<%= pkg.name %>.min.js" ]
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.registerTask("default", [ "build" ]);
    grunt.registerTask("build", [ "uglify" ]);
};
