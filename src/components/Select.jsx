import React,{useId} from 'react'


const Select = React.forwardRef(function select({
    options,
    label, 
    className="", 
    ...props},ref){
        const id={useId}
   return(
    <div className='w-full'>
        {label && (
            <label>
                {label}
            </label>
        )}
        <select 
        ref={ref}
        {...props} 
        id={id} 
        className='px-4 py-2 
        rounded-lg 
        border border-gray-300 bg-white text-black 
        duration-200 focus:bg-gray-50 outline-none w-full'>
            {
                options.map((option)=>(
                    <option 
                    value={option} key={option}>
                        {option}
                    </option>
                ))
            }
        </select>
    </div>
   ) 
})
export default Select;