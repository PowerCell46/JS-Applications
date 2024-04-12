import { main, urlEndpoints } from "../constants.js";
import { get } from "../utils/http.js";
import { filterHeader } from "../views/common.js";


export function filterQuizzes(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const {query, topic} = Object.fromEntries(data);

    get(urlEndpoints.quiz)
    .then(data => {
        let quizzes = Object.values(data)[0]
        query ? quizzes = quizzes.filter(q => q.title.toLowerCase().includes(query.toLowerCase())) : null;
        quizzes = quizzes.filter(q => q.topic === topic);

        const view = html`
            <section id="browse">
                ${filterHeader}


                <div class="pad-large alt-page">

                    ${quizzes.map(quizPreviewArticle)}
                    
                </div>
            </section>
        `;
        render(view, main);
    });
} 

[
    {
        "objectId": "n3rSWj38gH",
        "title": "Programming Basics",
        "topic": "it",
        "createdAt": "2024-04-12T06:27:11.741Z",
        "updatedAt": "2024-04-12T06:27:11.741Z"
    },
    {
        "objectId": "gyuPfmoYHl",
        "title": "Programming Fundamentals",
        "topic": "it",
        "createdAt": "2024-04-12T06:30:43.431Z",
        "updatedAt": "2024-04-12T06:30:43.431Z"
    },
    {
        "objectId": "ODEVHnMb8p",
        "title": "Programming Advanced",
        "topic": "it",
        "createdAt": "2024-04-12T06:31:15.916Z",
        "updatedAt": "2024-04-12T06:31:15.916Z"
    },
    {
        "objectId": "EHWayAhKmh",
        "title": "Python OOP",
        "topic": "it",
        "createdAt": "2024-04-12T06:32:02.346Z",
        "updatedAt": "2024-04-12T06:32:02.346Z"
    },
    {
        "objectId": "Z86afuRxfI",
        "title": "Python Exam",
        "topic": "it",
        "createdAt": "2024-04-12T06:55:44.646Z",
        "updatedAt": "2024-04-12T06:55:44.646Z"
    }
]