import mergeSort from './mergeSort.js'

export function evenSum(arr) {
	let sum = 0
	arr.forEach((element) => {
		// check if each element is even, if so add it to the value of the sum variable
		if (element % 2 === 0) {
			sum += element
		}
	})

	return sum
}

export function sortedEvenSum(arr) {
	// first sort the array using merge sort
	const sortedArr = mergeSort(arr)

	// then call evenSum
	return evenSum(sortedArr)
}

export function complexEvenSum(arr) {
	let sum = 0
	arr.forEach((element) => {
		// dummy loop :)
		for (let i = 0; i < arr.length; i++) {
			Math.sqrt(i)
		}

		if (element % 2 === 0) {
			sum += element
		}
	})

	return sum
}
