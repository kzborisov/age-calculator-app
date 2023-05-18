import { useState, ChangeEvent, useEffect } from "react";
import "./App.css";
import { ReactComponent as ArrowDown } from "./assets/images/icon-arrow.svg";

function App() {
    const [bDay, setBDay] = useState("");
    const [bMonth, setBMonth] = useState("");
    const [bYear, setBYear] = useState("");

    const [dayRes, setDayRes] = useState("--");
    const [monthRes, setMonthRes] = useState("--");
    const [yearRes, setYearRes] = useState("--");

    const getYearsGap = (today: Date, birthDate: Date) => {
        if (
            today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() == birthDate.getMonth() &&
                today.getDate() >= birthDate.getDate())
        ) {
            return today.getFullYear() - birthDate.getFullYear();
        } else {
            return today.getFullYear() - birthDate.getFullYear() - 1;
        }
    };

    const getMonthsGap = (today: Date, birthDate: Date) => {
        let months;
        if (today.getDate() >= birthDate.getDate()) {
            months = today.getMonth() - birthDate.getMonth();
        } else if (today.getDate() < birthDate.getDate()) {
            months = today.getMonth() - birthDate.getMonth() - 1;
        }
        // make month positive
        return months < 0 ? months + 12 : months;
    };

    const getDaysGap = (today: Date, birthDate: Date) => {
        const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (today.getDate() >= birthDate.getDate()) {
            return today.getDate() - birthDate.getDate();
        } else {
            return (
                today.getDate() -
                birthDate.getDate() +
                monthDays[birthDate.getMonth()]
            );
        }
    };

    useEffect(() => {
        const dateStr = `${bMonth}/${bDay}/${bYear}`;
        const birthDate = new Date(dateStr);
        const today = new Date();

        setYearRes(getYearsGap(today, birthDate).toString());
        // setMonthRes(getMonthsGap(today, birthDate).toString());
        setDayRes(getDaysGap(today, birthDate).toString());

        // const year = elapsed.getFullYear();
        // const month = elapsed.getMonth();
        // const day = elapsed.getDay();
        // console.log(day, month, year);
    }, [bDay, bMonth, bYear]);

    console.log(yearRes, monthRes, dayRes);

    const changeDay = (e: ChangeEvent<HTMLInputElement>) => {
        setBDay(e.target.value);
    };

    const changeMonth = (e: ChangeEvent<HTMLInputElement>) => {
        setBMonth(e.target.value);
    };

    const changeYear = (e: ChangeEvent<HTMLInputElement>) => {
        setBYear(e.target.value);
    };

    return (
        <>
            <section id='hero'>
                <div className='age-form-container'>
                    <form className='age-form'>
                        <div className='input-container'>
                            <label htmlFor='day' className='label label-day'>
                                Day
                            </label>
                            <input
                                id='day'
                                className='input'
                                onChange={changeDay}
                            />
                        </div>

                        <div className='input-container'>
                            <label
                                htmlFor='month'
                                className='label label-month'
                            >
                                Month
                            </label>
                            <input
                                id='month'
                                className='input'
                                onChange={changeMonth}
                            />
                        </div>
                        <div className='input-container'>
                            <label htmlFor='year' className='label label-year'>
                                Year
                            </label>
                            <input
                                id='year'
                                className='input'
                                onChange={changeYear}
                            />
                        </div>
                    </form>
                </div>

                <div className='devider-container'>
                    <div className='arrow-down'>
                        <ArrowDown />
                    </div>
                </div>

                <div className='results-container'>
                    <h4 className='result-box'>
                        <span className='result-number'>{yearRes}</span>{" "}
                        <span className='result-text'>years</span>
                    </h4>
                    <h4 className='result-box'>
                        <span className='result-number'>{monthRes}</span>{" "}
                        <span className='result-text'>months</span>
                    </h4>
                    <h4 className='result-box'>
                        <span className='result-number'>{dayRes}</span>{" "}
                        <span className='result-text'>days</span>
                    </h4>
                </div>
            </section>
        </>
    );
}

export default App;
