export const initializeTest = async (type) => {
    const examId = useState("examId");

    const data = await fetch(`http://localhost:10101/exams/create?type=${type}`, {
        method: 'POST'
    })
}

export const readNext = async () => {
    return new Promise(async (resolve, reject) => {
        const examId = useState("examId");
        const examQuestion = useState("examQuestion");

        examQuestion.value = await fetch(`http://localhost:10101/exams/readnext?id=${examId.value}`).then((res) => res.json()).catch(reject);
        console.log(examQuestion.value);
        resolve();
    })
}

export const submitQuestion = async (i) => {
    return new Promise(async (resolve, reject) => {
        const examId = useState("examId");
        const examQuestion = useState("examQuestion");

        await fetch(`http://localhost:10101/exams/submit?id=${examId.value}&ans=${i}`, {
            method: 'POST'
        }).catch(reject);

        resolve();
    })
}