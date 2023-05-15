# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Deploy
This Website is deployed on Github, link is as follows:
[React App (peach-muffin.github.io)](https://peach-muffin.github.io/terriblytinytales-frequency-counter/)

# FetchData Component

There is a React component called `FetchData` that retrieves data from a remote server, counts word frequency in the data, and displays the word frequency as well as a bar chart representing the top 20 most frequently occurring words.
## Installation
To use this component in your React application, follow these steps:

1.  Install the required dependencies by running the following command:
`npm install recharts`
2.  Create a new file named `FetchData.js` and copy the component code into it.
    
3.  Import the component in your desired location:
## Usage

The `FetchData` component a that, clicked, data from the specified URL (`https://www.terriblytinytales.com/test.txt`). After fetching the data, it counts the word frequency, generates a word frequency histogram, and allows the user to export the histogram data as a CSV file.
## Component Details

The `FetchData` component is implemented using React hooks. It maintains the following state variables:

-   `isOpen1`: Represents the visibility of the word frequency section.
-   `isOpen2`: Represents the visibility of the word frequency histogram section.
-   `histogramData`: Stores the data for the word frequency histogram.
-   `wordFrequency`: Stores the word frequency count.
-   `isFetching`: Indicates whether data is being fetched.
-   `isDataFetched`: Indicates whether data has been fetched successfully.

The component provides two functions to toggle the visibility of the sections: `toggle1` and `toggle2`.

The component also includes the following helper functions:

-   `fetchData`: Fetches data from the specified URL, counts word frequency, and updates the state variables accordingly.
-   `countWords`: Counts the frequency of words in a given text.
-   `sortWordsByCount`: Sorts the words based on their frequency count.

Additionally, the component provides an `exportToCSV` function to export the histogram data as a CSV file.

The word frequency section displays a list of words and their respective frequencies.
The word frequency histogram section displays a bar chart using the `BarChart` component from the `recharts` library.
