# Sum of Evens - Time Complexity Analysis

This project analyzes and visualizes the time complexity of three different algorithms for calculating the sum of even numbers in an array. It uses a web interface to allow users to select the range of input array sizes and displays the results in a chart.

## Algorithms Analyzed

1.  **Simple Traversal (`evenSum`)**: Iterates through the array once, checking each element and adding it to the sum if it's even. Expected time complexity: O(n).
2.  **Sort First (`sortedEvenSum`)**: First sorts the array using Merge Sort (O(n log n)) and then performs the simple traversal (O(n)). Expected time complexity: O(n log n).
3.  **With Nested Loop (`complexEvenSum`)**: Iterates through the array, but includes a nested loop inside (performing a dummy `Math.sqrt` operation). Expected time complexity: O(n^2).

## Features

*   Interactive range slider to select the minimum and maximum input array sizes.
*   Adjustable step size for generating different array sizes within the selected range.
*   Uses Web Workers ([`src/worker.js`](src/worker.js)) to run the benchmark analysis in the background, preventing the UI from freezing.
*   Visualizes the execution time of each algorithm against the input size using Chart.js.
*   Built with Vite and styled with Tailwind CSS and DaisyUI.

## Project Structure

```
.
├── public/             # Static assets
├── src/
│   ├── app.css         # Main CSS file (imports Tailwind/DaisyUI)
│   ├── benchmark.js    # Implementations of the three sum algorithms
│   ├── main.js         # Main frontend logic (UI interactions, Chart.js setup)
│   ├── mergeSort.js    # Merge Sort implementation
│   └── worker.js       # Web Worker script for running benchmarks
├── .gitignore
├── index.html          # Main HTML file
├── package.json        # Project dependencies and scripts
└── vite.config.js      # Vite configuration
```

## Setup and Usage

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the Vite development server, typically available at `http://localhost:5173`.

4.  **Build for production:**
    ```bash
    npm run build
    ```
    This creates a `dist` directory with the optimized production build.

5.  **Preview the production build:**
    ```bash
    npm run preview
    ```

## Technologies Used

*   [Vite](https://vitejs.dev/)
*   [Tailwind CSS](https://tailwindcss.com/)
*   [DaisyUI](https://daisyui.com/)
*   [Chart.js](https://www.chartjs.org/)
*   [range-slider-element](https://github.com/andreruffert/range-slider-element)
*   Web Workers
