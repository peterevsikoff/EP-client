import type { IPost } from "types";
import "./post.scss";
import { getLocalDateTime } from "utils";

const Post = ({post}: {
        post: IPost
    }) => {

    return(
        <div className="post">
            <h5>{post.title}</h5>
            <div className="post-date">{getLocalDateTime(post.dateTime)}</div>
            <div className="post-description">
                <p>{post.shortDescription}</p>
            </div>
        </div>
    )
}

export { Post };