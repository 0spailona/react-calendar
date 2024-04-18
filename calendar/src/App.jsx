import Calendar from "./components/calendar/calendar.jsx";

function App() {
    const now = {data: new Date()};

    return (
        <Calendar {...now}/>
    );
}

export default App;
