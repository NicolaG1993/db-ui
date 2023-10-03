import { useEffect, useState } from "react";
import styles from "@/src/application/styles/Records.module.css";
import {
    formatDateShort,
    formatMonthDay,
    getCurrentDate,
    getDaysArray,
} from "@/src/application/utils/convertTimestamp";

export default function Graph({ data }) {
    const [parsedData, setParsedData] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [divider, setDivider] = useState(0);
    const [sum, setSum] = useState(0);

    useEffect(() => {
        setEndDate(new Date().toISOString());
        // Get 7 days ago
        let date = new Date();
        date.setDate(date.getDate() - 6);
        setStartDate(date.toISOString());
        // setStartDate(formatDateShort(date.toISOString()));
    }, []);
    // console.log("💚💚💚 DATA: ", data);

    useEffect(() => {
        // prendere ultimi 7 giorni e creare JSON di records divisi per giorno
        // console.log("💚💚💚 DATA changed!!!: ", data, startDate, endDate);
        if (data && startDate && endDate) {
            let newObj = {};

            // set newObj keys as days, because we need days with 0 records too!
            var daylist = getDaysArray(new Date(startDate), new Date(endDate));
            daylist.map((d) => (newObj[formatDateShort(d.toISOString())] = []));

            // check if date is between selected days
            data.filter((el) => {
                let date = el.created_at;

                let startingDate = new Date(startDate);
                startingDate.setDate(startingDate.getDate() - 1);

                if (date >= startingDate.toISOString() && date <= endDate) {
                    newObj[formatDateShort(date)] = Array.isArray(
                        newObj[formatDateShort(date)]
                    )
                        ? [...newObj[formatDateShort(date)], el]
                        : [el];
                }
            });

            // console.log("💚💚💚 newObj: ", newObj);

            // getAllDays();

            setParsedData(newObj);
        } else {
            setParsedData(null);
        }
    }, [data, startDate, endDate]);

    useEffect(() => {
        if (parsedData) {
            let longestArray = 1;
            let recordsSum = 0;

            Object.values(parsedData).map((arr) => {
                if (arr.length > longestArray) {
                    longestArray = arr.length;
                }
                recordsSum = recordsSum + arr.length;
            });
            setDivider(longestArray + 1);
            setSum(recordsSum);
        } else {
            setDivider(0);
            setSum(0);
        }
    }, [parsedData]);

    // console.log("💚💚💚 startDate: ", startDate);
    // console.log("💚💚💚 endDate: ", endDate);
    // console.log("💚💚💚 divider: ", divider);

    return (
        <div className={styles.graphContainer}>
            <p>
                from {startDate ? formatMonthDay(startDate) : ""} to{" "}
                {endDate ? formatMonthDay(endDate) : ""}
            </p>

            <span>tot {sum}</span>

            {parsedData ? (
                <div className={styles.graph}>
                    {Object.entries(parsedData).map(([key, value], i) => (
                        <div
                            key={key + " graph day " + i}
                            className={styles.el}
                        >
                            <div className={styles.column}>
                                <div
                                    style={{
                                        height: `${
                                            (value.length / (divider - 1)) * 100
                                        }%`,
                                    }}
                                ></div>
                            </div>
                            <span>{value.length}</span>
                            <h5>{key}</h5>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
