import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import React from 'react'


const DashboardFormField = (props) => {

    const [showpassword, setShowPassword] = React.useState(false)


    let { name, type = "text", setText, mode = "text", text, max = null, placeholder = "type your text here...", multiline = false, password = false, onFocus = null, onClick = null, onFocusCapture = null } = props;
    placeholder = password ? '********' : placeholder

    return (
        <div className='w-auto py-2 px-4 m-2 my-5 border-2 border-gray-300 rounded-xl flex flex-col text-sm text-textcolor'>
            <div className='flex justify-between items-center text-textcolor'>
                <span className='font-medium text-md '>{name}</span>
                <span onClick={() => setShowPassword(!showpassword)} className='w-5 h-5 flex items-center justify-center '>
                    {password && (showpassword ? <EyeIcon className='w-[90%] h-[90%]' /> : <EyeOffIcon className='w-[90%] h-[90%]' />)}
                </span>
            </div>
            <span className='w-full'>
                {!multiline && <input onFocus={onFocus} onFocusCapture={onFocusCapture} onClick={() => onClick} onChange={(e) => setText(e.target.value)} maxLength={max} inputMode={mode} type={password ? !showpassword ? type : 'text' : type} placeholder={placeholder} value={text} className='pt-1 outline-none w-full' />}
                {multiline && <textarea maxLength={max} inputMode={mode} rows={3} onChange={(e) => setText(e.target.value)} type="text" placeholder={placeholder} value={text} className='pt-1 outline-none w-full' />}
            </span>
        </div>
    )
}

export default DashboardFormField