//document.onkeydown = KeyCheck;  //or however you are calling your method
function KeyCheck() {
	var KeyID = event.keyCode;
	switch (KeyID) {
		case 8:
			return 1;
			break;
		default:
			break;
	}
}

function mask(str, textbox, loc, delim) {
	var kcode = KeyCheck();
	if (kcode == 1) { // user click on backspace 
		return;
	}
	else {
		if (str.trim() != "" && str.length == 10) {
			if (checkDate(str, textbox)) { // if date is valid don't do mask	
				return;
			}
		}
		var locs = loc.split(',');
		for (var i = 0; i <= locs.length; i++) {
			for (var k = 0; k <= str.length; k++) {
				if (k == locs[i]) {
					if (str.substring(k, k + 1) != delim) {
						str = str.substring(0, k) + delim + str.substring(k, str.length)
					}
				}
			}
		}
		textbox.value = str
	}
}

function maskReturn(Val, textbox) {
	if (Val == "") {
		textbox.value = "";
		return;
	}
	var holeVal = Val.split(":");
	var hours = holeVal[0];
	var minits = holeVal[1];
	if (holeVal.length == 1) { // User Enter one number 1 2 3 no minutes
		minits = "00";
	}
	if (minits == "") { // user enter 2 digits for hours and no enter for minits
		minits = "00";
	}
	if (hours > 24) {
		alert('Hours must be less than 24');
		textbox.value = "";
		return;
	}
	if (minits > 59) {
		alert('Minutes must be less than 59');
		textbox.value = "";
		return;
	}
	if (hours == 24 && minits > 0) {
		alert('Invalid Data');
		textbox.value = "";
		return;
	}
	if (hours.length == 1) {
		hours = "0" + hours;
	}
	if (minits.length == 1) {
		minits = "0" + minits;
	}
	textbox.value = hours + ":" + minits;
}
var mm;
var dd;
var yyyy;
var daysInMonth;

function checkDate(str, textbox) {
	if (str.trim() != "") {
		if (str != "" && str.length == 10) {
			if (str.split("-").length > 2) { // if user hold pressing key
				var arr = str.split('-');
				if (arr[2].length == 2) { // yyyy-mm-dd
					dd = arr[2];
					mm = arr[1];
					yyyy = arr[0];
				}
				else { // dd-mm-yyyy
					dd = arr[0];
					mm = arr[1];
					yyyy = arr[2];
				}
				setDaysInMonth(mm);
				var submitting = (checkDay() && checkMonth() && checkYear());
				if (submitting) {
					textbox.value = yyyy + "-" + mm + "-" + dd;
					return submitting;
				}
				else {
					InvalidDate(textbox);
				}
				return submitting;
			}
		}
		else if (str != "" && str.length < 10) {
			InvalidDate(textbox);
		}
		else {
			InvalidDate(textbox);
		}
	}
}

function checkDay() {
	if (dd != "" && dd >= 1 && dd <= daysInMonth) {
		return true;
	}
	return false;
}

function checkMonth() {
	if (mm != "" && mm >= 1 && mm <= 12) {
		return true;
	}
	return false;
}

function checkYear() {
	if (yyyy.length == 4) {
		return true;
	}
	return false;
}

function setDaysInMonth(month) {
	leap = (yyyy % 400 == 0) || ((yyyy % 4 == 0) && (yyyy % 100 != 0));
	if (month == 4 || month == 6 || month == 9 || month == 11) {
		daysInMonth = 30;
	}
	else if (month == 2 && leap) {
		daysInMonth = 29;
	}
	else if (month == 2 && !leap) {
		daysInMonth = 28;
	}
	else {
		daysInMonth = 31;
	}
}

function InvalidDate(textbox) {
	textbox.value = "";
	/*alert(document.getElementById("hdnInvalidDate").value);*/
	textbox.focus();
}