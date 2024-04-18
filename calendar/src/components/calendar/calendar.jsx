import "./calendar.css";
import days from "days-in-month";
import daysNames from "./daysNames.js";
import monthsNames from "./monthsNames.js";

export default function (props) {
    const dateNow = props.data.getDate();
    const day = props.data.getDay();
    const year = props.data.getFullYear();
    const month = props.data.getMonth();

    const dateString = props.data.toLocaleString(undefined, {month: "long", day: "numeric"});

    const monthHeader = dateString.split(" ")[1];

    const countDaysInMonth = days(props.data);
    const countDaysInPrevMonth = days(month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    let weeks = [];
    for (let i = 0; i < 5; i++) {
        let week = [];
        for (let n = 1; n <= 7; n++) {

            const date = 7 * i + n - firstDayOfMonth + 1;
            if (date === dateNow) {
                week.push(<td key={n} className="ui-datepicker-today">{dateNow}</td>);
            }
            else if (date < 1) {
                week.push(<td key={n} className="ui-datepicker-other-month">{countDaysInPrevMonth + date}</td>);
            }
            else if (date > countDaysInMonth) {
                week.push(<td key={n} className="ui-datepicker-other-month">{date - countDaysInMonth}</td>);
            }
            else {
                week.push(<td key={n}>{date}</td>);
            }
        }
        weeks.push(<tr key={i}>{week}</tr>);
    }

    return <div className="ui-datepicker">
        <div className="ui-datepicker-material-header">
            <div className="ui-datepicker-material-day">{daysNames[day]}</div>
            <div className="ui-datepicker-material-date">
                <div className="ui-datepicker-material-day-num">{dateNow}</div>
                <div className="ui-datepicker-material-month">{monthHeader}</div>
                <div className="ui-datepicker-material-year">{year}</div>
            </div>
        </div>
        <div className="ui-datepicker-header">
            <div className="ui-datepicker-title">
                <span className="ui-datepicker-month">{monthsNames[month]}</span>&nbsp;<span
                className="ui-datepicker-year">{year}</span>
            </div>
        </div>
        <table className="ui-datepicker-calendar">
            <colgroup>
                <col/>
                <col/>
                <col/>
                <col/>
                <col/>
                <col className="ui-datepicker-week-end"/>
                <col className="ui-datepicker-week-end"/>
            </colgroup>
            <thead>
            <tr>
                <th scope="col" title="Понедельник">Пн</th>
                <th scope="col" title="Вторник">Вт</th>
                <th scope="col" title="Среда">Ср</th>
                <th scope="col" title="Четверг">Чт</th>
                <th scope="col" title="Пятница">Пт</th>
                <th scope="col" title="Суббота">Сб</th>
                <th scope="col" title="Воскресенье">Вс</th>
            </tr>
            </thead>
            <tbody>
            {weeks}
            </tbody>
        </table>
    </div>;
}