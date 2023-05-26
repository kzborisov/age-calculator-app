import { useState, ChangeEvent, FormEvent } from "react";
import "./App.css";

interface ageI {
    years: number;
    months: number;
    days: number;
}

function App() {
    const [bDay, setBDay] = useState("");
    const [bMonth, setBMonth] = useState("");
    const [bYear, setBYear] = useState("");
    const [dayInvalid, setDayInvalid] = useState(false);
    const [monthInvalid, setMonthInvalid] = useState(false);
    const [yearInvalid, setYearInvalid] = useState(false);

    const [age, setAge] = useState<ageI>();

    const calculateAge = (birthday: Date) => {
        const today = new Date();
        const diff = Number(today) - Number(birthday);
        const ageInSeconds = new Date(diff);
        const years = Math.abs(ageInSeconds.getUTCFullYear() - 1970);
        const months = Math.abs(ageInSeconds.getUTCMonth());
        const days = Math.abs(ageInSeconds.getUTCDate() - 1);
        return { years, months, days };
    };

    function isValidDate(bDateString: string) {
        const regEx = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
        if (!bDateString.match(regEx)) return false;
        return true;
    }

    const changeDay = (e: ChangeEvent<HTMLInputElement>) => {
        const day = e.target.value;

        if (Number(day) > 31 || Number(day) < 1) {
            setDayInvalid(true);
            return;
        }
        setDayInvalid(false);
        setBDay(day);
    };

    const changeMonth = (e: ChangeEvent<HTMLInputElement>) => {
        const month = e.target.value;

        if (Number(month) > 12 || Number(month) < 1) {
            setMonthInvalid(true);
            return;
        }
        setMonthInvalid(false);

        setBMonth(e.target.value);
    };

    const changeYear = (e: ChangeEvent<HTMLInputElement>) => {
        const year = e.target.value;
        const currentYear = new Date().getFullYear();
        if (Number(year) > Number(currentYear)) {
            setYearInvalid(true);
            return;
        }

        setYearInvalid(false);
        setBYear(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const bDateString = `${bYear}-${bMonth}-${bDay}`;

        if (bDay.length === 0) {
            setDayInvalid(true);
        }

        if (bMonth.length === 0) {
            setMonthInvalid(true);
        }

        if (bYear.length === 0) {
            setYearInvalid(true);
        }

        if (!isValidDate(bDateString)) {
            return;
        }

        const birthday = new Date(bDateString);
        const age = calculateAge(birthday);
        setAge(age);
    };

    return (
        <>
            <section id='hero'>
                <div className='age-form-container'>
                    <form className='age-form' onSubmit={handleSubmit}>
                        <div className='input-box'>
                            <div className='input-container'>
                                <label
                                    htmlFor='day'
                                    className={`label label-day ${
                                        dayInvalid && "invalid"
                                    }`}
                                >
                                    Day
                                </label>
                                <input
                                    id='day'
                                    className={`input ${
                                        dayInvalid ? "invalid" : ""
                                    }`}
                                    onChange={changeDay}
                                    placeholder='DD'
                                />
                            </div>

                            <div className='input-container'>
                                <label
                                    htmlFor='month'
                                    className={`label label-month ${
                                        monthInvalid && "invalid"
                                    }`}
                                >
                                    Month
                                </label>
                                <input
                                    id='month'
                                    className={`input ${
                                        monthInvalid ? "invalid" : ""
                                    }`}
                                    onChange={changeMonth}
                                    placeholder='MM'
                                />
                            </div>
                            <div className='input-container'>
                                <label
                                    htmlFor='year'
                                    className={`label label-year
                                    ${yearInvalid && "invalid"}`}
                                >
                                    Year
                                </label>
                                <input
                                    id='year'
                                    className={`input ${
                                        yearInvalid ? "invalid" : ""
                                    }`}
                                    onChange={changeYear}
                                    placeholder='YYYY'
                                />
                            </div>
                        </div>

                        <div className='devider-container'>
                            <button type='submit' className='arrow-down'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='46'
                                    height='44'
                                    viewBox='0 0 46 44'
                                >
                                    <g
                                        fill='none'
                                        stroke='#FFF'
                                        strokeWidth='3'
                                    >
                                        <path d='M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44' />
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>

                <div className='results-container'>
                    <h1 className='result-box'>
                        <span className='result-number'>
                            {age ? age.years : "--"}
                        </span>{" "}
                        <span className='result-text'>
                            {age?.years === 1 ? "year" : "years"}
                        </span>
                    </h1>
                    <h1 className='result-box'>
                        <span className='result-number'>
                            {" "}
                            {age ? age.months : "--"}
                        </span>{" "}
                        <span className='result-text'>
                            {age?.months === 1 ? "month" : "months"}
                        </span>
                    </h1>
                    <h1 className='result-box'>
                        <span className='result-number'>
                            {" "}
                            {age ? age.days : "--"}
                        </span>{" "}
                        <span className='result-text'>
                            {age?.days === 1 ? "day" : "days"}
                        </span>
                    </h1>
                </div>
            </section>
        </>
    );
}

export default App;
