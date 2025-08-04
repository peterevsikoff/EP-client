import type { IPost } from "types";
import "./post.scss";
import { getLocalDateTime } from "utils";
import { useState } from "react";
import clsx from "clsx";
import { Close } from "components";


const Post = ({post}: {
        post: IPost
    }) => {

    const [show, setShow] = useState(false);

    return(
        <div className={clsx("post", {"post-show": show})} onClick={() => setShow(true)}>
            <div className="post-title">
                <h5>{post.title}</h5>
                {
                    show &&
                    <button className="btn-close-post" onClick={e => {e.stopPropagation(); setShow(false);}}>
                        <Close/>
                    </button>
                }
            </div>
            <div className="post-date">{getLocalDateTime(post.dateTime)}</div>
            <div className="post-description">
                <p>{show ? post.description : post.shortDescription}</p>
            </div>
        </div>
    )
}

export { Post };