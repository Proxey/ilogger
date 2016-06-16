module.exports = grunt => {
    grunt.initConfig({
        jshint: {
            options: {
                esversion: '6',
                globals: {
                    require: true,
                    module: true,
                    console: true,
                    process: true
                }
            },
            test: ['src/*']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', ['jshint:test']);
};