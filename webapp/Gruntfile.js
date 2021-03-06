module.exports = function (grunt) {
	
	require('time-grunt')(grunt);
	
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jscs');
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
				spec: 'spec',
				data: 'example-data'
			}
		},

		connect: {
			dev: {
				options: {
					hostname: 'localhost',
					port: 8000,
					livereload: true,
					base: ['<%= config.directory.data %>', '<%= config.directory.servtmp %>', '<%= config.directory.app %>'],
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
				files: ['<%= config.directory.scripts %>/**/*.js', '<%= config.directory.spec %>/**/*.js'],
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
					specs: '<%= config.directory.spec %>/**/*-spec.js',
					helpers: '<%= config.directory.spec %>/**/*-helper.js',
					vendor: [ 'app/.3rd-party/angularjs/angular.js', 'app/.3rd-party/jquery/dist/jquery.js', 'app/.3rd-party/underscore/underscore.js' ],
					template: require('grunt-template-jasmine-requirejs'),
					templateOptions: {
						requireConfigFile: '<%= config.directory.scripts %>/app.js',
						requireConfig: {
							baseUrl: '<%= config.directory.scripts %>'
						}
					}
				}
			}
		},
		
		jshint: {
			dist: {
				src: ['<%= config.directory.scripts %>/**/*.*js', '<%= config.directory.spec %>/**/*.js']
			}
		},
		
		jscs: {
			options: {
		        config: ".jscsrc"
			},
			dist: {
				src: ['<%= config.directory.scripts %>/**/*.*js', '<%= config.directory.spec %>/**/*.js']
			}			
		}
	});
	
	grunt.registerTask('serve', [ 'sass:dev', 'jshint', 'jscs', 'jasmine:dev', 'connect:dev', 'watch']);
	grunt.registerTask('build', [ /* out of scope of the task */ ]);
	grunt.registerTask('test', [ 'jshint', 'jscs', 'jasmine' ]);
};
