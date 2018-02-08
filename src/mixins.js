var giantMock = require('./assets/giantMock.json')


export var randomizeDataMixin = {
	methods: {
		mock10000: function() {
	        let sliceA = giantMock.slice(0, 2000)
	        let sliceB = giantMock.slice(2000, 4000)
	        let sliceC = giantMock.slice(4000, 6000)
	        let sliceD = giantMock.slice(6000, 8000)
	        let sliceE = giantMock.slice(8000, 10000)

	        let slices = [sliceA, sliceB, sliceC, sliceD, sliceE]
	        let newData = []
	        
	        while (slices.length > 0) {
	          let randomNumber = Math.floor(Math.random() * slices.length)
	          let temp = slices.splice(randomNumber, 1)[0]
	          newData = newData.concat(temp)
	        }

	        console.log('data randomized')
	        return newData
		},
		mock25000: function(){
			let newData = this.mock10000()
			newData = newData.concat(newData)
			newData = newData.concat(newData.slice(0, 5000))
			
	        console.log('data randomized')
			return newData
		},
		mock50000: function(){
			let newData = this.mock10000()
	        let newestData = []

	       	for (var i = 0; i < 5; i++) {
	       		newestData = newestData.concat(newData)
	       	}

	        console.log('data randomized')
	        return newestData
		},
		mock100000: function(){
			let newData = this.mock10000()
	        let newestData = []

	       	for (var i = 0; i < 10; i++) {
	       		newestData = newestData.concat(newData)
	       	}

	        console.log('data randomized')
	        return newestData
		}

	}
}