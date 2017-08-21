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

		/*
		// callback style
		si.cpuTemperature(Meteor.bindEnvironment(function(data){
			Data.update({type: 'cputemp'}, {temp: data.main, type: 'cputemp'}, {upsert: true})
		}))

		si.cpu(Meteor.bindEnvironment(function(data){
			Data.update({type: 'cpuinf'}, {cpu: data.total, type: 'cpuinf'}, {upsert: true})
		}))

		si.mem(Meteor.bindEnvironment(function(data){
			Data.update({type: 'mem'}, {mem: data.main, type: 'mem'}, {upsert: true})
		}))
		*/


	}), 1000)
	
	Meteor.publish('data', function(){
		return Data.find({})
	})
});
