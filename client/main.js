import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Data } from '/collections'
import _ from 'lodash'
import Chart from 'chart.js';

import './main.html';

const prettyBytes = require('pretty-bytes')
const moment = require('moment')

let subscriptions = [
	Meteor.subscribe('data')
	]
Template.loading.helpers({
	subscriptionsReady: function() {
		for (let sub of subscriptions){
			if (!sub.ready()) return false
		}
		return true
	}
})

function chartupdate(chart) {
	let dynamic = Data.findOne({type: 'dynamic'})
	let memory = {
		'Free': dynamic.data.mem.free,
		'Total': dynamic.data.mem.total,
		'Used': dynamic.data.mem.used
	}

	let data = Object.keys(memory).map(function(key){
            		return memory[key]
            	})

console.log(chart.'get data'())
	/*for (let i in data) {
		chart.datasets[0].bars[i].value = data[i]
	}*/
	chart.update()
}

Template.main.onRendered(function(){

	let dynamic = Data.findOne({type: 'dynamic'})
	let memory = {
		'Free': dynamic.data.mem.free,
		'Total': dynamic.data.mem.total,
		'Used': dynamic.data.mem.used
	}
	var ctx = document.getElementById("myChart")
	let chart = new Chart(ctx, {
		type: 'bar',
    	data: {
        	labels: Object.keys(memory),
        	datasets: [{
            	label: '# of Votes',
            	data: Object.keys(memory).map(function(key){
            		return memory[key]
            	}),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
	})
	setInterval(function(){
		chartupdate(chart)
	}, 1000)
})

Template.main.helpers({

	get: function(obj, what) {
		return _.get(obj, what)
	},

	dynamic: function() {
		return Data.findOne({type: 'dynamic'})
	},

	static: function() {
		return Data.findOne({type: 'static'})
	},

	format: function(f) {
		return prettyBytes(f)
	},

	round: function(r) {
		return Math.round(r)
	},

	moment: function(t) {
		return moment(t).format('Do MMM YYYY, H:mm:ss a')
	},

	

	localadresses: function(data) {
		let res = data.net.map(function(p){
			return p.ip4
		})

		res = [...new Set(res)]
		res.sort(function(a,b){
			return a.localeCompare(b)
		})
		res = res.filter(a => a != '' && a != '127.0.0.1')
		return res
	},
})


