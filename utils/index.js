export const initializeTest = (type) => {
    return new Promise(async (resolve, reject) => {
        const examId = useState("examId");

        const data = await fetch(`https://api.hamradio.comradeturtle.dev/exams/create?type=${type}`, {
            method: 'POST'
        }).then((res) => res.json()).catch(reject);

        examId.value = data.payload.id;
        navigateTo('/question');
        resolve(examId.value);
    })
}

export const secondsToHMS = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export const readNext = async () => {
    return new Promise(async (resolve, reject) => {
        const examId = useState("examId");
        const examQuestion = useState("examQuestion");

        examQuestion.value = await fetch(`https://api.hamradio.comradeturtle.dev/exams/readnext?id=${examId.value}`).then((res) => res.json()).catch(reject);
        resolve();
    })
}

export const submitQuestion = async (i) => {
    return new Promise(async (resolve, reject) => {
        const examId = useState("examId");
        const examQuestion = useState("examQuestion");

        const data = await fetch(`https://api.hamradio.comradeturtle.dev/exams/submit?id=${examId.value}&ans=${i}`, {
            method: 'POST'
        }).then((res) => res.json()).catch(reject);

        if (data.status === 'complete') navigateTo('/result');

        resolve();
    })
}

export const getResults = async (id) => {
    return new Promise(async (resolve, reject) => {
        const data = await fetch(`https://api.hamradio.comradeturtle.dev/exams/results?id=${id}`).then((res) => res.json()).catch(((res) => resolve({status: res.status})));

        useState("examResults", () => data);
        resolve(data);
    })
}