import React from "react"
import marked from "marked"
import ContentEditable from 'react-contenteditable'
import style from "./Previewer.css"

marked.setOptions({ sanitize: true})

export default function Previewer(props) {
    return (
        <div id="previewer" className={`${props.className} ${style.previewer}`} >
            <ContentEditable html={marked(props.value)} disabled={true} />
        </div>
    )
}