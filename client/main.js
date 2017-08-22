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
		//console.log(obj)
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
	},

	localadresses: function(data) {
		let res = data.networkConnections.map(function(p){
			return p.localaddress
		})

		res = [...new Set(res)]
		res.sort(function(a,b){
			return a.localeCompare(b)
		})
		res = res.filter(a => a != '*' && a != '::1' && a != '127.0.0.1')
		return res
	}
})