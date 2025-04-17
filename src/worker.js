import { evenSum, sortedEvenSum, complexEvenSum } from './benchmark.js'

self.onmessage = (event) => {
	const range = event.data.range
	const step = event.data.step
	self.postMessage(runTest(range, step))
}

function runTest(range = [2000, 8000], step = 100) {
	// find the array sizes based on range
	const sizes = []

	// generate all the sizes in the range
	for (let i = range[0]; i < range[1] + step; i = i + step) {
		sizes.push(i)
	}

	let evenTimes = []
	let sortedTimes = []
	let complexTimes = []
	const tableResults = []

	// generate an array for each size, and measure the time it takes for each sum function to perform
	sizes.forEach((size) => {
		const arr = generateArray(size)

		// calculate the time each method takes
		const evenSumTime = measure(evenSum, arr)
		const sortedSumTime = measure(sortedEvenSum, arr)
		const complexSumTime = measure(complexEvenSum, arr)

		// push the results into the tableResults array, each as an object (needed for table display)
		tableResults.push({
			size,
			evenSum: evenSumTime,
			sortedEvenSum: sortedSumTime,
			complexEvenSum: complexSumTime,
		})

		// push the times into the corresponding arrays (needed for chart display on the frontend)
		evenTimes.push(evenSumTime)
		sortedTimes.push(sortedSumTime)
		complexTimes.push(complexSumTime)
	})

	// log a table in the console
	console.table(tableResults)

	// return values required by chart.js
	return {
		sizes: sizes,
		evenTimes: evenTimes,
		sortedTimes: sortedTimes,
		complexTimes: complexTimes,
	}
}

function generateArray(size) {
	const arr = []
	for (let i = 0; i < size; i++) {
		// push random numbers between 0 (inclusive) and 1000 (exclusive) to the array
		arr.push(Math.floor(Math.random() * 1000))
	}
	return arr
}

function measure(fn, arr) {
	// get the current time in milliseconds, before the calling the function
	const start = performance.now()
	// call the function
	fn(arr)
	// get the current time again, after the the function finishes running
	const end = performance.now()
	// return the total time the function took
	return end - start
}
