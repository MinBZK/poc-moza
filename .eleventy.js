const fs = require('fs');
const path = require('path');

module.exports = function (eleventyConfig) {

    // Inline SVG shortcode
    eleventyConfig.addShortcode('icon', function(iconPath) {
        if (!iconPath) return '';
        const filePath = path.join('.', iconPath);
        return fs.readFileSync(filePath, 'utf8');
    });

    // Nederlandse datum-notatie: "19 februari 2026".
    // Parse "YYYY-MM-DD" direct om timezone-drift te vermijden (new Date() interpreteert UTC).
    eleventyConfig.addFilter('datumNL', function(datumStr) {
        if (!datumStr) return '';
        const MAANDEN = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'];
        const m = datumStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!m) return 'Onbekende datum';
        const mnd = parseInt(m[2], 10);
        if (mnd < 1 || mnd > 12) return 'Onbekende datum';
        return parseInt(m[3], 10) + ' ' + MAANDEN[mnd - 1] + ' ' + parseInt(m[1], 10);
    });

    // Statische bestanden kopiëren naar _site
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("style");

    return {
        pathPrefix: "/",
        dir: {
            input: ".",
            includes: "_includes",
            output: "_site"
        },
        templateFormats: ["njk", "html", "md"],
        htmlTemplateEngine: "njk",
        cleanOutput: true
    };
};
