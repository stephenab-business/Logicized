import React, { FC, memo, useEffect, useState } from "react";

import { NodeProps } from "inputs-and-outputs-renderer";
import "./NodeCommentNode.scss";

/**
 * 
 * What needs to be done:
 * - NEED TO MAKE IT TO WHERE THE USER IS AUTOMATICALLY FOCUSED IN THE INPUT
 * - NEED TO MAKE IT TO WHERE IF NO INPUT IS ENTERED, AND THE INPUT IS CLICKED OFF, THE NODE IS DELETED AND THE DATA VARIABLES ARE RESET ON THE NODE
 * - Need to change the input to match the width
 * - Need to lock the location of this node to the position of the other node - DONE
 */

const NodeCommentNode: FC<NodeProps> = ({ data }) => {
    const [initialized, setInitialized] = useState<boolean>(data.initialized);
    const [editing, setEditing] = useState<boolean>(data.editing);
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
        data.submitted = true;
        setSubmitted(true);
        data.content = content;
        data.typing = false;
    }

    const edit = (event: React.FormEvent) => {
        event.preventDefault();
        setEditing(false);
        data.edit = false;
        setSubmitted(true);
        data.content = content;
        data.submitted = true;
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
            <div className = "node-comment" style={{width: data.width}}>
                {!initialized && 
                <form onSubmit={initialize}>
                    <input className="node-comment-initial" type="text" placeholder="Add a comment..." onChange={onChange} autoFocus autoComplete="off" />
                </form>
                }
                {submitted && 
                <div className="node-comment-submitted" onDoubleClick={onDoubleClick}>
                    <div className="node-comment-text-box">
                        {data.content}
                    </div>
                    <div className = "node-comment-pointer" />
                </div>
                }
                {editing && 
                <form onSubmit={edit}>
                    <input className="node-comment-edit" type="text" defaultValue={data.content} onChange={onChange} autoFocus autoComplete="off" />
                </form>
                }
            </div>
        </>
    );
};

export default memo(NodeCommentNode);

    /* 
     *
     * Notes for Comment Node:
     * - When Node created, you will automatically be in the text box to type
     * - On enter, end the comment - DONE
     * - On shift+enter, end the comment
     * - On tab, add the amount of spaces from settings (HARD CODE FOR NOW)
     * - Comment box, at first, is the width of the Node
     * - If comment reaches the width of the Node (or a few spaces before), the textbox will expand in the y direction and move all of the next text down to the new line
     * - On comment end, the text box (white) will disappear and only the text will be there, but the spacing will still be there
     * - Add the new line before the next character appears
     * - Undo the line if the character is deleted
     * - If the comment node is double clicked, the textbox will be reopened - DONE
     * 
     */

/*
* function updateSize(e) {
  let text = e.target.value + String.fromCharCode(event.keyCode);
  e.target.rows = text.split(/\r\n|\r|\n/).length;
}

function keyDownUpdateSize(e) {
  if (event.keyCode != 8 && event.keyCode != 46)
    updateSize(e);
}

function keyUpUpdateSize(e) {
  if (event.keyCode == 8 || event.keyCode == 46)
    updateSize(e);
}

    
  
document.querySelector(selector_to_your_textarea).addEventListener("keydown", keyDownUpdateSize);
document.querySelector(selector_to_your_textarea).addEventListener("keyup", keyUpUpdateSize);
*/

    // const onShiftEnterDown = () => {
        
    // }

    // const onTabDown = () => {

    // }