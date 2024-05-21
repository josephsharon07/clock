document.addEventListener('DOMContentLoaded', (event) => {
    async function currentTemperature() {
        try {
            let response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Aralvaimozhi&units=metric&APPID=991abfe98a5b1cbcd90f5eee7c796443');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let data = await response.json();
            let { temp, feels_like, pressure, humidity } = data.main;

            document.getElementById('temperature').innerText = `${temp} °C`;
            document.getElementById('feels').innerText = `${feels_like} °C`;
            document.getElementById('pressure').innerText = `${pressure} hPa`;
            document.getElementById('humidity').innerText = `${humidity} %`;
            console.log("Wheater Updatead");
        } catch (error) {
            console.error("Error fetching the temperature:", error);
        }
    }

    function currentTime() {
        let date = new Date(); 
        let mmm = date.toLocaleString('default', { month: 'short' });
        let yyy = date.getFullYear();
        let ddd = date.getDate();
        let hh = date.getHours();
        let mm = date.getMinutes();
        let ss = date.getSeconds();
        let session = "AM";

        if (hh == 0) {
            hh = 12;
        }
        if (hh > 12) {
            hh -= 12;
            session = "PM";
        }

        hh = (hh < 10) ? "0" + hh : hh;
        mm = (mm < 10) ? "0" + mm : mm;
        ss = (ss < 10) ? "0" + ss : ss;

        let time = `${hh}:${mm}:${ss} ${session}`;
        let mdy = `${mmm} ${ddd}, ${yyy}`;
        document.getElementById("mmddyy").innerText = mdy;
        document.getElementById("clock").innerText = time;

        setTimeout(currentTime, 1000);
        setTimeout(currentTemperature, 60000);
    }

    currentTemperature();
    currentTime();
});