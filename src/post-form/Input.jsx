import React, {useId} from 'react'

const id=useId

const Input = React.forwardRef(function input({
    label,
    type="text",
    className="",
    ...props
}, ref){
    return(
        <div>
            {label && (
                <label htmlFor={id} className='inline-block mb-1 pl-1'>
                    {label}
                </label>
            )}
            <input 
            type={type} 
            ref={ref} 
            {...props} 
            id={id} className={`px-3 py-2
            bg-white
            text-white 
            outline-none 
            rounded-lg border 
            border-gray-200 
            focus:bg-gray-50 w-full${className}`} />
        </div>
    )
})

export default Input; 