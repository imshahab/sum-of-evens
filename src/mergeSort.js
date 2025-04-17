// main function
export default function mergeSort(arr) {
	// check if the base state is reached
	if (arr.length <= 1) return arr

	// find the middle of the array
	const mid = Math.floor(arr.length / 2)

	// recursive calls
	const left = mergeSort(arr.slice(0, mid))
	const right = mergeSort(arr.slice(mid))

	// merge the two arrays
	return merge(left, right)
}

// merge two sorted arrays
function merge(left, right) {
	let sorted = []

	while (left.length && right.length) {
		if (left[0] > right[0]) {
			// remove and push the right array's first element to the sorted array
			sorted.push(right.shift())
		} else {
			// remove and push the left array's first element to the sorted array
			sorted.push(left.shift())
		}
	}

	// combine the three arrays
	return [...sorted, ...left, ...right]
}
