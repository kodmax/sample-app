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
	grunt.loadNpmTasks('grunt-sass');
	//grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	
	grunt.initConfig({
		config: {
			directory: {
				servtmp: 'build/serve-tmp',
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
					base: ['<%= config.directory.servtmp %>', '<%= config.directory.app %>'],
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
				files: ['<%= config.directory.servtmp %>/css/**/*.css', '<%= config.directory.styles %>/**/*.css'],
				options: { livereload: true }
			}
		},
		
		sass: {
			options: {
				includePaths: ['<%= config.directory._3rdparty %>/bourbon/app/assets/stylesheets']
			},
			
			dev: {
				files: {
					'<%= config.directory.servtmp %>/css/app.css': ['<%= config.directory.styles %>/main.scss']
				}
			}
		},
		
		jasmine: {
			dev: {
				src: '<%= config.directory.scripts %>/**/*.js',
				options: {
					keepRunner: true,
					specs: 'spec/**/*-spec.js',
					helpers: 'spec/**/*-helper.js',
					vendor: [ 'app/.3rd-party/angularjs/angular.js', 'app/.3rd-party/jquery/dist/jquery.js', 'app/.3rd-party/underscore/underscore.js' ],
					template: require('grunt-template-jasmine-requirejs'),
					templateOptions: {
						requireConfigFile: '<%= config.directory.scripts %>/app.js',
						requireConfig: {
							baseUrl: 'app/scripts'
						}
					}
				}
			}
		}
	});
	
	grunt.registerTask('serve', [ 'sass:dev', /*'jshint', 'karma:dev', 'dom_templates:compile', */ 'connect:dev', 'watch']);
	grunt.registerTask('build', [ /* out of scope of the task */ ]);
};
