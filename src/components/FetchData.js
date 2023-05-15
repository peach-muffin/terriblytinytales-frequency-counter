import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './FetchData.css';

function FetchData() {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [histogramData, setHistogramData] = useState([]);
    const [wordFrequency, setWordFrequency] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const toggle1 = () => {
        setIsOpen1(!isOpen1);
        setIsOpen2(false);
    };
    const toggle2 = () => {
        setIsOpen2(!isOpen2);
        setIsOpen1(false);
    };

    const fetchData = async () => {
        setIsFetching(true);
        setIsDataFetched(true);
        try {
            const response = await fetch('https://www.terriblytinytales.com/test.txt');
            const text = await response.text();
            const wordCountMap = countWords(text);
            setWordFrequency(wordCountMap);
            const sortedWords = sortWordsByCount(wordCountMap);
            const top20Words = sortedWords.slice(0, 20);
            setHistogramData(top20Words);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsFetching(false);
        }
    };

    const countWords = (text) => {
        const words = text.toLowerCase().match(/\w+/g);
        const wordCountMap = {};
        if (words) {
            words.forEach((word) => {
                wordCountMap[word] = (wordCountMap[word] || 0) + 1;
            });
        }
        return wordCountMap;
    };

    const sortWordsByCount = (wordCountMap) => {
        const words = Object.keys(wordCountMap);
        return words.sort((a, b) => wordCountMap[b] - wordCountMap[a]).map((word) => ({
            word,
            count: wordCountMap[word],
        }));
    };

    const exportToCSV = () => {
        const csvContent = 'data:text/csv;charset=utf-8,' + encodeURI(
            'Word,Count\n' +
            histogramData.map(({ word, count }) => `${word},${count}`).join('\n')
        );
        const link = document.createElement('a');
        link.setAttribute('href', csvContent);
        link.setAttribute('download', 'histogram_data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <div>
                <div className="button-main">
                <button className="button" onClick={fetchData} disabled={isFetching}>
                    {isFetching ? 'Fetching data' : 'Submit'}
                </button>
                </div>
            </div>
            {isDataFetched && wordFrequency && (
                <div className="main-container">
                    <div className="main-header" onClick={toggle1}>
                        <div>
                            <h2>Word Frequency</h2>
                        </div>
                    </div>
                    {isOpen1 && <div className="main-content">
                        <ul class="container-word-frequency">
                            {Object.entries(wordFrequency).map(([word, count]) => (
                                // <li key={word}>
                                //     {word}: {count}
                                // </li>
                                <li><p key={word}>
                                    {word}: {count}
                                </p>&nbsp;</li>

                            ))}
                        </ul>
                    </div>}
                </div>
            )}
            {isDataFetched && histogramData.length > 0 && (
                <div className="main-container">
                    <div className="main-header" onClick={toggle2}> 
                        <div>
                            <h2>Word Frequency Histogram</h2>
                        </div>
                    </div>
                    {isOpen2 && <div className="main-content">
                        <div className="button-main">
                            <button className="button" onClick={exportToCSV}>Export</button>
                        </div>
                        <BarChart width={1000} height={400} data={histogramData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="word" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                    </div>}
                </div>
            )}
        </div>
    );
};

export default FetchData;
