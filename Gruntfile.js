/*global module */
module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        uglify: {
            options: {
                preserveComments: false,
                banner: "/* <%= pkg.name %> <%= pkg.version %> (<%= pkg.repository.url %>) */\n"
            },
            default: {
                files: {
                    "<%= pkg.name %>.min.js" : [ "<%= pkg.name %>.js" ]
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.registerTask("default", [ "build" ]);
    grunt.registerTask("build", [ "uglify" ]);
};
