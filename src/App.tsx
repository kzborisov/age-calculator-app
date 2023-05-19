import { useState, ChangeEvent, useEffect } from "react";
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
        console.log(bDateString);
        if (!bDateString.match(regEx)) return false;
        return true;
    }

    useEffect(() => {
        const bDateString = `${bYear}-${bMonth}-${bDay}`;
        if (!isValidDate(bDateString)) {
            return;
        }

        const birthday = new Date(bDateString);
        const age = calculateAge(birthday);
        setAge(age);
    }, [bDay, bMonth, bYear]);

    console.log();
    const changeDay = (e: ChangeEvent<HTMLInputElement>) => {
        setBDay(e.target.value);
    };

    const changeMonth = (e: ChangeEvent<HTMLInputElement>) => {
        setBMonth(e.target.value);
    };

    const changeYear = (e: ChangeEvent<HTMLInputElement>) => {
        setBYear(e.target.value);
    };

    console.log(age);
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
                                placeholder='DD'
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
                                placeholder='MM'
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
                                placeholder='YYYY'
                            />
                        </div>
                    </form>
                </div>

                <div className='devider-container'>
                    <div className='arrow-down'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='46'
                            height='44'
                            viewBox='0 0 46 44'
                        >
                            <g fill='none' stroke='#FFF' strokeWidth='3'>
                                <path d='M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44' />
                            </g>
                        </svg>
                    </div>
                </div>

                <div className='results-container'>
                    <h1 className='result-box'>
                        <span className='result-number'>
                            {age ? age.years : "--"}
                        </span>{" "}
                        <span className='result-text'>years</span>
                    </h1>
                    <h1 className='result-box'>
                        <span className='result-number'>
                            {" "}
                            {age ? age.months : "--"}
                        </span>{" "}
                        <span className='result-text'>months</span>
                    </h1>
                    <h1 className='result-box'>
                        <span className='result-number'>
                            {" "}
                            {age ? age.days : "--"}
                        </span>{" "}
                        <span className='result-text'>days</span>
                    </h1>
                </div>
            </section>
        </>
    );
}

export default App;
