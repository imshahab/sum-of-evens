import Worker from './worker.js?worker'
import 'range-slider-element'
import 'range-slider-element/style.css'
import Chart from 'chart.js/auto'

// get dom elements
const analyzeBtnEl = document.getElementById('analyze-btn')
const minRangeEl = document.getElementById('min-range')
const maxRangeEl = document.getElementById('max-range')
const rangeStepsEl = document.getElementById('range-steps')
const resultCardEl = document.getElementById('result-card')

// get the initial value of the range slider
const rangeSliderEl = document.querySelector('range-slider')
let range = []
let step = 0
updateInputValues()

// render the chart
render(range, step)

// listen for changes on the slider, and update the values accordingly
rangeSliderEl.addEventListener('input', () => updateInputValues())

// listen for changes on the step select element, and update the values accordingly
rangeStepsEl.addEventListener('change', () => updateInputValues())

// listen for user request for analysis
analyzeBtnEl.addEventListener('click', () => render(range, step))

function updateInputValues() {
	// update the step variable based on user selection
	step = parseInt(rangeStepsEl.value)

	// get the range slider's value, turn it into an array and turn the elements (min and max) into ints
	range = rangeSliderEl.value
		.split(',')
		.map((rangeValue) => parseInt(rangeValue))
	// set the indicators' values
	minRangeEl.value = range[0]
	maxRangeEl.value = range[1]
}

function render(range, step) {
	// disable the analyze button
	analyzeBtnEl.disabled = true

	// disable the step selector
	rangeStepsEl.disabled = true

	// disable the range slider
	rangeSliderEl.disabled = true

	// check if a chart already exists, if so, remove it from the dom and replace it with a loading indicator
	const canvasEl = document.getElementById('benchmark-chart')
	if (canvasEl) {
		canvasEl.remove()
	}
	// create a loading indicator and append it to the dom
	const loadingIndicatorEl = document.createElement('span')
	const loadingTextEl = document.createElement('span')
	const loadingDivEl = document.createElement('div')
	loadingDivEl.setAttribute(
		'class',
		'flex flex-col items-center justify-center gap-2'
	)
	loadingTextEl.innerText = 'Now analyzing...'
	loadingIndicatorEl.setAttribute(
		'class',
		'loading loading-spinner loading-lg'
	)
	loadingDivEl.appendChild(loadingIndicatorEl)
	loadingDivEl.appendChild(loadingTextEl)
	resultCardEl.appendChild(loadingDivEl)

	// run the test
	const worker = new Worker()
	worker.postMessage({ range: range, step: step })
	worker.onmessage = (event) => {
		// get the results
		let result = event.data

		// remove the loading indicator
		loadingDivEl.remove()

		// create a new chart canvas and append it
		const newCanvasEl = document.createElement('canvas')
		newCanvasEl.setAttribute('id', 'benchmark-chart')
		resultCardEl.appendChild(newCanvasEl)

		// create the chart
		const ctx = newCanvasEl.getContext('2d')
		new Chart(ctx, {
			type: 'line',
			data: {
				labels: result.sizes,
				datasets: [
					{
						label: 'evenSum - Simple Traversal',
						data: result.evenTimes,
						borderColor: 'green',
						fill: false,
					},
					{
						label: 'sortedEvenSum - Sort First',
						data: result.sortedTimes,
						borderColor: 'blue',
						fill: false,
					},
					{
						label: 'complexEvenSum - With Nested Loop',
						data: result.complexTimes,
						borderColor: 'red',
						fill: false,
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					x: { title: { display: true, text: 'Input Size (n)' } },
					y: {
						title: { display: true, text: 'Execution Time (ms)' },
					},
				},
			},
		})

		// re-enable the step selector
		rangeStepsEl.disabled = false

		// re-enable the range slider
		rangeSliderEl.disabled = false

		// re-enable the analyze button
		analyzeBtnEl.disabled = false
	}
}
