module.exports = {
	"Localhost index page loads": function (browser) {
		browser
			.url("http://localhost:4200/")
			.waitForElementVisible('body', 10000)
			.end();
	}
};
