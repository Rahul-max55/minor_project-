import React from 'react'
import { HiViewGrid } from "react-icons/hi";
import { MdViewList } from "react-icons/md";

const Sort = ({ columnRow , changeRow, changeColumn }) => {
  return (
    <div className="icons_grid">
      <HiViewGrid className={columnRow === "false" ? "Active" : " "} onClick={() => { changeColumn() }} />
      <MdViewList className={columnRow === "true" ? "Active" : " "} onClick={() => { changeRow()}} />
    </div>
  )
}

export default Sort