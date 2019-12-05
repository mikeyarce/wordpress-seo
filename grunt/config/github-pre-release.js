
const spawn = require( "child_process" ).spawnSync;
const fs = require('fs')

function openChangelogEditor ( grunt ) {
	const editor = process.env.VISUAL || process.env.EDITOR || "vim" || "code" || "subl";

	// Spawn editor and save to changelog_buffer.txt
	const { status } = spawn( editor, ["changelog_buffer.txt"], {stdio:"inherit"} );
	if ( status !== 0 ) {
		grunt.fail.fatal( "Something went wrong while editing the changelog." );
	}

	// Read out the changelog_buffer.txt contents.
	const data = grunt.file.read( "changelog_buffer.txt" );

	if ( data.length === 0 ) {
		grunt.file.delete( "changelog_buffer.txt" );
		grunt.fail.fatal( "The changelog cannot be empty." );
	}

	grunt.file.delete( "changelog_buffer.txt" );

	return data;

}

/**
 * ...
 *
 * @param {Object} grunt The grunt helper object.
 * @returns {void}
 */
module.exports = function( grunt ) {
	grunt.registerTask(
		"github-pre-release",
		"Creates and pushes a github pre-release and uploads the artifact to GitHub",
		function() {
			// Open a text editor to get the changelog.
			const changelog = openChangelogEditor( grunt );
			console.log(changelog);
		}
	);
};