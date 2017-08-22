import { Meteor } from 'meteor/meteor';
import { Data } from '/collections'
import si from './systeminformation'

Meteor.startup(() => {

	si.getStaticData(Meteor.bindEnvironment(function(data){
		Data.update({type: 'static'}, {data: data, type: 'static'}, {upsert: true})
	}))

	setInterval(Meteor.bindEnvironment(function() {

		si.getDynamicData(Meteor.bindEnvironment(function(data){
			Data.update({type: 'dynamic'}, {data: data, type: 'dynamic'}, {upsert: true})
		}))

	}), 1000)
	
	Meteor.publish('data', function(){
		return Data.find({})
	})
});
