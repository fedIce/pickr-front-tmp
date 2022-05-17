import { ChatIcon, ClipboardIcon, HomeIcon, LogoutIcon, MenuAlt1Icon, TemplateIcon, ViewGridAddIcon } from '@heroicons/react/outline'
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../../GlobalContexts/AuthProvider';


const DashLink =({
    to,
    className,
    activeClassName='',
    inactiveClassName='',
    children,
    ...rest
  }) => {
    let location = useLocation();
    let isActive = location.pathname.includes(to) ;

    
    let allClasses = className + (isActive ? ` ${activeClassName}`:` ${inactiveClassName}`)
    return  <Link className={allClasses} to={to} {...rest} >{children}</Link>
  }

const menu = [
    {
        id: 1,
        title: "Dashboard",
        icon: TemplateIcon,
        to:"main"
    },
    // {
    //     id: 2,
    //     title: "Orders",
    //     icon: ClipboardIcon,
    //     to:"order"
    // },
    // {
    //     id: 3,
    //     title: "Products",
    //     icon: ViewGridAddIcon,
    //     to:"product"
    // },
    // {
    //     id: 4,
    //     title: "Messages",
    //     icon: ChatIcon,
    //     to:"chats"

    // },
    {
        id: 4,
        title: "Logout",
        icon: LogoutIcon,
        to:"logout"

    }
]

const SideBar = ({open, setOpen}) => {


    return (
        <div className='flex flex-col items-start space-y-9 pl-2 w-full h-full'>
            <div onClick={() => setOpen(!open)} className='flex items-center space-x-3 text-primary-500 mb-20'>
                <span><MenuAlt1Icon  className='w-8 h-8' /></span>
                {/* {open && <span className='text-lg font-semibold'>T-Shop</span>} */}
            </div>
            {
                menu.map((item, indx) => {
                    return <MenuItem hidden={open} key={indx} item={item} />
                })
            }
        </div>
    )
}

const MenuItem = ({item, active, hidden }) => {
    let location = useLocation();
    const auth = useAuth()
    let isActive = location.pathname.includes(item.to) ;
    const isactive =  item.title === "Products"
    return item.to !== 'logout'?(
        <DashLink to={item.to} activeClassName={` bg-primary-100 text-primary-700`} className={`ease_transition w-full px-3 py-3 rounded-tl-xl rounded-bl-xl flex text-primary-500 justify-start items-center space-x-3`}>
            <span >{<item.icon  className={`base-icon text-primary-500 ${isActive && 'text-primary-600'}`} />}</span>
            {hidden && <span className=" font-medium text-md">{item.title}</span>}
        </DashLink>
    ):(
        <div onClick={() => auth.signout() } className={`ease_transition cursor-pointer w-full px-3 py-3 rounded-tl-xl rounded-bl-xl flex text-primary-500 justify-start items-center space-x-3`}>
            <span >{<item.icon  className={`base-icon text-primary-500 ${isActive && 'text-primary-600'}`} />}</span>
           {hidden && <span className=" font-medium text-md">{item.title}</span>}
        </div>
    )
}

export default SideBar