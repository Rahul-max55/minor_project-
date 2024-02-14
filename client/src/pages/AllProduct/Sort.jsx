import React from 'react'
import { HiViewGrid } from "react-icons/hi";
import { MdViewList } from "react-icons/md";

const Sort = ({ columnRow , changeRow, changeColumn }) => {
  return (
    <div className="flex text-2xl ">
      <HiViewGrid className={columnRow === "false" ? "Active mx-2 cursor-pointer" : "mx-2 cursor-pointer"} onClick={() => { changeColumn() }} />
      <MdViewList className={columnRow === "true" ? "Active cursor-pointer" : "cursor-pointer"} onClick={() => { changeRow()}} />
    </div>
  )
}

export default Sort