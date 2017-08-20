import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Temps } from '/collections'

import './main.html';

Meteor.subscribe('temps')

Template.main.helpers({
	testhelper: function() {
		return Temps.findOne({}).temp
	}
})