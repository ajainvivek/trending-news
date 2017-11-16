'use strict';

const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const stopWords = ['a', 'the', 'to', 'when', 'about', 'by', 'and', 'with'];

/**************************************************************************
 Normalize the words into every sentence
 1. Extract the words out of it
 2. Apply stemming
 3. Remove the stop words
 **************************************************************************/

let isStopWord = function (word) {
	for(let i in stopWords) {
		if(stopWords[i] === word) {
			return true;
		}
	}
	return false;
}

let removeEqualWords = function (words) {
	for(let i = 0; i < words.length; i++) {
		for(let j = i + 1; j < words.length; j++) {
			if(words[i] === words[j]) {
				let head = words.slice(0,j);
				let tail = words.slice(j+1);
				words = head.concat(tail);
				j = j - 1;
			}
		}
	}
	return words;
}

let normalizing = function (sentence) {
	let words = tokenizer.tokenize(sentence);
	for(let i in words) {
		if(isStopWord(words[i])) {
			words.splice(i, 1);
			continue;
		}
		words[i] = natural.PorterStemmer.stem(words[i]);
	}
	return words;
}

let exists = function(word, array) {
	for(let i = 0; i < array.length; i++) {
		if(array[i] === word) {
			return true;
		}
	}
	return false;
}

let identicalWordsInSentence =  function(list1, list2) {
	let identical = [];
	for(let i = 0; i < list1.length; i ++) {
		for(let j = 0; j < list2.length; j++) {
			if(list1[i] === list2[j] && !(exists(list1[i], identical))) {
				identical.push(list1[i]);
			}
		}
	}
	return identical;
}

exports.similarity =  function (sentence1, sentence2) {
	let a = normalizing(sentence1);
	let b = normalizing(sentence2);
	let identical = identicalWordsInSentence(a, b);
	let result = (identical.length / (a.length + b.length - identical.length));
	return result;
}