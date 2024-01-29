import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import React from 'react';

const RTE = ({name, control, label,defaultValue}) => {
  return (
    <div className="w-full">
      {
        label && <label className="inline-block ml-1 pl-1">{label}</label>
      }
      <Controller 
      name={name || 'content'} 
      control={control} render={({field: {onchange}})=>(
        <Editor initialValue={defaultValue} init={{
            branding:false,
            height:500,
            menubar:true,
            plugins:[

            ],
            toolbar:"",
            content_style:""
        }} onEditorChange={onchange} />
      )} />
    </div>
  );
}

export default RTE;
