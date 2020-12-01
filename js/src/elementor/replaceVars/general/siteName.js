import { __ } from "@wordpress/i18n";
import { get } from "lodash";

/**
 * Returns the replacement for the %%sitename%% variable.
 *
 * @returns {string} The sitename.
 */
function getReplacement() {
	return get( window, "wpseoScriptData.analysis.plugins.replaceVars.replace_vars.sitename", "" );
}

/**
 * Represents the sitename replacement variable.
 *
 * @returns {Object} The sitename replacement variable.
 */
export default {
	name: "sitename",
	label: __( "Site title", "wordpress-seo" ),
	placeholder: "%%sitename%%",
	aliases: [],
	getReplacement,
	regexp: new RegExp( "%%sitename%%", "g" ),
};
