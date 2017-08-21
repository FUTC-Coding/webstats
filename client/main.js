import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Data } from '/collections'
import _ from 'lodash'

import './main.html';

let subscriptions = [
	Meteor.subscribe('data')
]
Template.main.helpers({

	get: function(obj, what) {
		console.log(obj)
		return _.get(obj, what)
	},

	dynamic: function() {
		return Data.findOne({type: 'dynamic'})
	},

	static: function() {
		return Data.findOne({type: 'static'})
	},

	subscriptionsReady: function() {
		for (let sub of subscriptions){
			if (!sub.ready()) return false
		}
		return true
	}
})