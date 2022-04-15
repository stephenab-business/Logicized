import React, { FC, memo, useEffect, useState } from "react";

import { NodeProps } from "inputs-and-outputs-renderer";
import "./FreeCommentNode.scss";

const FreeCommentNode: FC<NodeProps> = ({ data }) => {
    const [initialized, setInitialized] = useState<boolean>(data.initialized);
    const [editing, setEditing] = useState<boolean>(data.edit);
    const [content, setContent] = useState<string>(data.content);
    const [submitted, setSubmitted] = useState<boolean>(data.submitted);

    useEffect(() => {
        if (data.edit) {
            setSubmitted(false);
            setEditing(true);
        } else if (!data.edit && data.initialized) {
            setSubmitted(true);
            setEditing(false);
        }
    }, [data.edit, data.initialized]);

    const initialize = (event: React.FormEvent) => {
        event.preventDefault();
        setInitialized(true);
        data.initialized = true;
        setSubmitted(true);
        data.submitted = true;
        data.content = content;
        data.typing = false;
    }

    const edit = (event: React.FormEvent) => {
        event.preventDefault();
        setEditing(false);
        data.edit = false;
        setSubmitted(true);
        data.submitted = true;
        data.content = content;
        data.typing = false;
    }

    const onDoubleClick = () => {
        setSubmitted(false);
        data.submitted = false;
        setEditing(true);
        data.edit = true;
    }

    const onChange = (event: any) => {
        setContent(event.target.value);
        data.typing = true;
    }

    return(
        <>
            <div className = "free-comment">
                {!initialized && 
                <form onSubmit={initialize}>
                    <input id="free-comment-initial" type="text" placeholder="Add a comment..." onChange={onChange} autoFocus autoComplete="off" />
                </form>
                }
                {submitted && 
                <div className = 'free-comment-submitted'>
                    <div className="free-comment-text-box" onDoubleClick={onDoubleClick}>
                        {data.content}
                    </div>
                </div>
                }
                {editing && 
                <form onSubmit={edit}>
                    <input id="free-comment-edit" type="text" defaultValue={data.content} onChange={onChange} autoFocus autoComplete="off"/> 
                </form>
                }
            </div>
        </>
    );
};

export default memo(FreeCommentNode);