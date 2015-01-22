/*
 __________________________________________________________
 WoDCC - World of Darkness Character Creator by Johann Haaf
 ==========================================================
 * 
 * 
 -----------------------------------
 * Changelog:
 */

jQuery.fn.reverse = [].reverse; /*JQuery Reverse Plugin*/
window.datastorage = {
	data : {},

	getData: function () {
		return this.data;
	},
	setData: function (data) {
		this.data = data;
	},
	createDot: function (category, subcategory, defaultValue, list) {
		if (!this.data[category]) {
			this.data[category] = {};
		}
		if (!this.data[category][subcategory]) {
			this.data[category][subcategory] = {};
		}
		this.data[category][subcategory] = this.setValues(defaultValue, list);
		return this;
	},
	setValues: function (val, list) {
		var obj = {}, i = list.length;

		while (i--) {
			if (!obj[list[i]]) {
				obj[list[i]] = {};
			}
			obj[list[i]] = val;
		}
		return obj;
	},

	Tooltips: {
		addTooltip: function (eleId, eleData) {
			var ele = $("#" + eleId), offset = ele.offset();
			ele.addClass("TooltipAbove");
			ele.attr("data-tooltip", eleData);
		},
		addTooltips: function () {
			var i, n;
			for (i = 0; i < arguments.length; i++) {
				if (typeof arguments[i].id === "string") {
					this.addTooltip(arguments[i].id, arguments[i].data);
				} else {
					for (n = 0; n < arguments[i].id.length; n++) {
						this.addTooltip(arguments[i].id[n], arguments[i].data);
					}
				}
			}
		}
	}
};
/*
 function setRules(ruleset) {
	switch (ruleset) {
	case '':
		this.ruleSetAttributes = WoD.ruleSetAttributes;
		break;
	default:
		this.ruleSetAttributes = WoD.ruleSetAttributes;
		break;
	}
}
*/

function check(e, forcecheck) {
	var ele = e, parent = ele.parent(), isChecked = ele.hasClass("checked"), children = (isChecked || forcecheck) ? parent.children().reverse() : parent.children(), targetfound = false;

	if (forcecheck) {
		children.each(function (i, value) {
			if (value.id === ele.attr('id')) {
				targetfound = true;
			}

			if (targetfound) {
				$(value).addClass("checked");
			} else {
				$(value).removeClass("checked");
			}
		});
	} else {
		if (ele.next().hasClass("checked")) {
			ele = ele.next();
		}

		children.each(function (i, value) {
			if (isChecked) {
				$(value).removeClass("checked");
			} else {
				$(value).addClass("checked");
			}

			var att, sub, dot, parentId = parent.attr('id');

			if (value.id === ele.attr('id')) {
				for (att in data) {
					for (sub in data[att]) {
						for (dot in data[att][sub]) {
							if (parentId === dot) {
								data[att][sub][parentId] = (isChecked) ? children.length - i - 1 : i + 1;
								return false;
							}
						}
					}
				}
			}
		});
	}
}

function checkData(d, forcecheck) {
	var att, sub, dot;
	for (att in d) {
		for (sub in d[att]) {
			for (dot in d[att][sub]) {
				if (d[att][sub][dot] > 0) {
					check($("#" + dot + d[att][sub][dot]), forcecheck);
				}
			}
		}
	}
}

function loadImage(src) {
}

function giveFeedback(msg, type, dur) {
	var timeout = (dur) ? dur : 3000, css = (type) ? type : 'hint';

	$('#feedback').html(msg);
	$('#feedback').show();
	$('#feedback').addClass(css);
	setTimeout(function () {
		$('#feedback').fadeOut(3000, function () {
			$('#feedback').html('');
			$('#feedback').removeClass(css);
		});
	}, timeout);
}
var data = datastorage.getData();

$(document).ready(function () {
	/* load Data */
	$(document.body).append($('<script src="resources/data/core.js"></script>')); // load Data.js

	/* initialize events */
	$("#btnCreateUrl").click(function () {
		/* create URL */
		var tmpHash = '#', att, sub, dot;

		for (att in data) {
			for (sub in data[att]) {
				for (dot in data[att][sub]) {
					tmpHash += data[att][sub][dot];
				}
			}
		}

		document.location.hash = tmpHash;
		$("#txtCreateUrl").val(document.URL.split('#')[0] + tmpHash);
		$("#linkCreateUrl").attr("href", tmpHash);
	});

	$("#saveData").click(function () {
		var att, sub, dot, JSONString = '{\n\t\"data\": {\n';
		for (att in data) {
			JSONString += '\t\t\"' + att + '\": {\n';
			for (sub in data[att]) {
				JSONString += '\t\t\t\"' + sub + '\": {\n';
				for (dot in data[att][sub]) {
					JSONString += '\t\t\t\t\"' + dot + '\": ' + data[att][sub][dot] + ',\n';
				}
				JSONString = JSONString.substr(0, JSONString.lastIndexOf(','));
				JSONString += '\n\t\t\t},\n';
			}
			JSONString = JSONString.substr(0, JSONString.lastIndexOf(','));
			JSONString += '\n\t\t},\n';
		}
		JSONString = JSONString.substr(0, JSONString.lastIndexOf(','));
		JSONString += '\n\t}\n}';

		$('#datafield').val(JSONString);
		giveFeedback('Data generated!<br>Please don\'t forget to copy your generated data into a file!', 'hint', 3000);
	});

	$("#loadData").click(function () {
		var value = $('#datafield').val(), newData;

		if (value === "") {
			giveFeedback('Please enter your previously saved Data into the textarea below.', 'hint');
		} else {
			try {
				newData = $.parseJSON(value);

				if (newData && newData.data) {
					datastorage.setData(newData.data);
					data = newData.data;
					checkData(data, true);
					giveFeedback('Data loaded successfully!', 'hint');
				} else {
					giveFeedback('Data corrupt!', 'hint');
				}
			} catch (err) {
				giveFeedback('Error! Corrupt Data:\n\nError description: ' + err.message, 'error', 10000);
			}
		}
	});

	$("li.attr").add($("li.sk")).click(function (event) {
		/* update data when changing values */
		check($(event.delegateTarget));
	});

	$(".selBox option").click(function (event) {
		var ele = $(event.delegateTarget);
		if(ele.hasClass("chosen")) {
			ele.removeClass("chosen");
		} else {
			ele.addClass("chosen");
		}		
	});

	/* executed once */
	checkData(data);
	/*
		configRuleset.setRules = setRules;
		configRuleset.setRules();
	*/
});
