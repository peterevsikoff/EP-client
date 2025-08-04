import { useSelector } from "react-redux";
import { selectCommonData } from "selectors";
import "./posts.scss";
import { Post } from "./Post/Post";

const Posts = () => {
    const { language } = useSelector(selectCommonData);

    const posts = [
        {
            id: "1",
            title: "Мы запускаем проект",
            dateTime: "2025-08-04 13:05:18.207551+00",
            shortDescription: "Рады поделиться с Вами замечательной новостью: сегодня мы запускаем наш проект",
            description: "",
        },
        {
            id: "2",
            title: "Мы запускаем проект",
            dateTime: "2025-08-04 13:05:18.207551+00",
            shortDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
            description: "",
        },
        {
            id: "3",
            title: "Мы запускаем проект",
            dateTime: "2025-08-04 13:05:18.207551+00",
            shortDescription: "Рады поделиться с Вами замечательной новостью: сегодня мы запускаем наш проект",
            description: "",
        },
        {
            id: "4",
            title: "Мы запускаем проект",
            dateTime: "2025-08-04 13:05:18.207551+00",
            shortDescription: "Рады поделиться с Вами замечательной новостью: сегодня мы запускаем наш проект",
            description: "",
        },
        {
            id: "5",
            title: "Мы запускаем проект",
            dateTime: "2025-08-04 13:05:18.207551+00",
            shortDescription: "Рады поделиться с Вами замечательной новостью: сегодня мы запускаем наш проект",
            description: "",
        },
        {
            id: "6",
            title: "Мы запускаем проект",
            dateTime: "2025-08-04 13:05:18.207551+00",
            shortDescription: "Рады поделиться с Вами замечательной новостью: сегодня мы запускаем наш проект",
            description: "",
        },
        {
            id: "7",
            title: "Мы запускаем проект",
            dateTime: "2025-08-04 13:05:18.207551+00",
            shortDescription: "Рады поделиться с Вами замечательной новостью: сегодня мы запускаем наш проект",
            description: "",
        },
    ];
    
    return(
        <section className="posts">
            <div className="container">
                <div className="posts-wrap">
                    <h4>{language.posts}:</h4>
                    <div className="posts-container">
                        {
                            posts.map(x => <Post key={x.id} post={x}/>)
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export { Posts };