import { Meteor } from 'meteor/meteor';
import { Temps } from '/collections'
import si from './systeminformation'

Meteor.startup(() => {
	setInterval(Meteor.bindEnvironment(function() {


	// callback style
	si.cpuTemperature(Meteor.bindEnvironment(function(data){
		Temps.update({type: 'cpu'}, {temp: data.main, type: 'cpu'}, {upsert: true})
	}))

}), 1000)
	Meteor.publish('temps', function(){
		return Temps.find({})
	})

});
