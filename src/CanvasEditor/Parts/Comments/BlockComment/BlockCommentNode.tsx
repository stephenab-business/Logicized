import React, { FC, memo, useEffect, useState } from "react";

import { NodeProps, useStoreState } from "inputs-and-outputs-renderer";
import "./NodeCommentNode.scss";

/**
 * 
 * What needs to be done:
 * - NEED TO MAKE IT TO WHERE THE USER IS AUTOMATICALLY FOCUSED IN THE INPUT
 * - NEED TO MAKE IT TO WHERE IF NO INPUT IS ENTERED, AND THE INPUT IS CLICKED OFF, THE NODE IS DELETED AND THE DATA VARIABLES ARE RESET ON THE NODE
 * - Need to change the input to match the width
 * - Need to lock the location of this node to the position of the other node - DONE
 */

const BlockCommentNode: FC<NodeProps> = ({ data }) => {
    const [initialize, setInitialize] = useState<boolean>(data.initialize);
    const [editing, setEditing] = useState<boolean>(data.editing);
    const [content, setContent] = useState<string>(data.content);
    const [submitted, setSubmitted] = useState<boolean>(data.submitted);
    

    useEffect(() => {
        if (data.edit) {
            setSubmitted(false);
            setEditing(true);
            data.edit = false;
            data.submitted = false;
        } else if (!initialize && !editing) {
            data.submitted = true;
            setSubmitted(true);
        }
    }, [initialize, data, editing])


    const initialized = (event: React.FormEvent) => {
        event.preventDefault();
        setInitialize(false);
        data.initialize = false;
        setSubmitted(true);
        data.content = content;
    }

    const edit = (event: React.FormEvent) => {
        event.preventDefault();
        setEditing(false);
        setSubmitted(true);
        data.content = content;
    }

    const onChange = (event: any) => {
        setContent(event.target.value);
    }

    const onDoubleClick = () => {
        setEditing(true);
    }

    return(
        <>
            <div className = "block-comment" style={{width: data.width}}>
                {initialize && 
                <form onSubmit={initialized}>
                    <input className="block-comment-initial" type="text" placeholder="Add a comment..." onChange={onChange} />
                    <div className="block-comment-rectangle"></div>
                </form>
                }
                {submitted && 
                <div className="block-comment-submitted" onDoubleClick={onDoubleClick}>
                    <div className="block-comment-text-box">
                        {data.content}
                    </div>
                    <div className="block-comment-rectangle"></div>
                </div>
                }
                {editing && 
                <form onSubmit={edit}>
                    <input className="block-comment-edit" type="text" defaultValue={data.content} onChange={onChange} />
                    <div className="block-comment-rectangle"></div>
                </form>
                }
            </div>
        </>
    );
};

export default memo(BlockCommentNode);

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