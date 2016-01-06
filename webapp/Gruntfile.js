module.exports = function (grunt) {
	
	require('time-grunt')(grunt);
	
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	//grunt.loadNpmTasks('grunt-contrib-requirejs');
	//grunt.loadNpmTasks('grunt-contrib-copy');
	//grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-usemin');
	//grunt.loadNpmTasks('grunt-contrib-cssmin');
	//grunt.loadNpmTasks('grunt-filerev');
	//grunt.loadNpmTasks('grunt-contrib-clean');
	//grunt.loadNpmTasks('grunt-contrib-htmlmin');
	//grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-karma');
	//grunt.loadNpmTasks('grunt-jsdoc');
	//grunt.loadNpmTasks('grunt-sass');
	//grunt.loadNpmTasks('grunt-mocha-test');
	
	grunt.initConfig({
		config: {
			directory: {
				servtmp: 'build/servtmp',
				tmp: 'build/tmp',
				app: 'app',
				scripts: 'app/scripts',
				_3rdparty: 'app/.3rd-party',
				styles: 'app/styles',
				templates: 'app/templates',
				build: 'build/artifacts',
				test: 'test'
			}
		},

		connect: {
			dev: {
				options: {
					hostname: 'localhost',
					port: 8000,
					livereload: true,
					base: ['<%= config.directory.tmp %>', '<%= config.directory.app %>'],
					open: true
				}
			}
		},
		
		watch: {
			html: {
				files: ['<%= config.directory.app %>/index.html'],
				options: { livereload: true },
			},
			
			scripts: {
				files: ['<%= config.directory.scripts %>/**/*.js', '<%= config.directory.test %>/**/*.js'],
				options: { livereload: true },
				tasks: ['jshint']
			},
			
			styles: {
				files: ['<%= config.directory.styles %>/**/*.scss'],
				tasks: ['sass']
			},
			
			css: {
				files: ['<%= config.directory.servtmp %>/css/**/*.css'],
				options: { livereload: true }
			}
		}		
	});
	
	grunt.registerTask('serve', [/* 'sass', 'jshint', 'karma:dev', 'dom_templates:compile', */ 'connect:dev', 'watch']);
};