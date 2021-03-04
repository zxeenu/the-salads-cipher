let textfield;
let output;
let selector;
let DoE; // decode or encode
let step;
let button;

function setup() {
	noCanvas();

	createP("Input goes here!");

	textfield = createInput();
	textfield.input(newTyping);
	textfield.class("input");

	createP("A number!");

	step = createInput("1");
	step.class("step");
	step.input(newTyping);

	createP("Choose!");

	selector = createSelect();
	selector.option('ENCODE');
	selector.option('DECODE');
	selector.selected("DECODE");
	selector.changed(changeTextMode);

	output = select("#output");

	createP("");

	button = createButton("Refresh");
	button.mousePressed(newTyping);

}

function newTyping() {

	let s = textfield.value();
	let stepNum = step.value();

	if (selector.value() == 'ENCODE' && isNumeric(stepNum)) {
		let i = encode(s, stepNum);
		s = stringBuilderEncoder(i);
		// console.log("encode");
		// s = s.toUpperCase();
	} else if (selector.value() == 'DECODE' && isNumeric(stepNum)) {
		let j = decode(s, stepNum);
		s = stringBuilderDecoder(j);
		// console.log("decode");
		// s = s.toLowerCase();
	} else {
		s = "The step is not a number! Use a valid number!"
		// console.log("default");
	}

	output.html(s);
}

function changeTextMode() {
	DoE = selector.value();
}

function isNumeric(value) {
	return /^-?\d+$/.test(value);
}


function encode(string, step) {
    let encoded_arry = [];
    let stepAsNum = parseInt(step);

    for (let i = 0; i < string.length; i++) {
        let num = string.charCodeAt(i);
        num += stepAsNum;
        encoded_arry.push(num.toString());
    }

    return encoded_arry;
}

function decode(string, step) {
    let decoded_arry = [];
    let stepAsNum = parseInt(step);

    for (let i = 0; i < string.length; i++) {
        let charCode = string.charCodeAt(i);
        charCode -= stepAsNum;
        let char = String.fromCharCode(charCode);
        decoded_arry.push(char);
    }

    return decoded_arry;
}

function stringBuilderEncoder(array) {
    let newString = "";

    for (let i = 0; i < array.length; i++)
    {
        let elem = array[i];
        let char = String.fromCharCode(elem);
        newString = newString.concat(char);
    }

    return newString;
}

function stringBuilderDecoder(array) {
    let newString = "";

    for (let i = 0; i < array.length; i++)
    {
        let elem = array[i];
        newString = newString.concat(elem);
    }

    return newString;
}