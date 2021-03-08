import {NavLink} from "react-router-dom";
import { BsFillPlusCircleFill} from "react-icons/bs";
import { FaListAlt } from "react-icons/fa"

import '../styles/Navigation.css'
import {useGlobalContext} from "../AppContext";

const Navigation = () => {
    const {deactivateEditing} = useGlobalContext();
    return (
        <>
            <div className='nav'>
                <div className='navlink-container'>
                <NavLink to='/'><button className='btn' onClick={deactivateEditing}>all recipes<i className='icon-btn'><FaListAlt/></i></button></NavLink>
                <NavLink to='/add'><button className='btn' onClick={deactivateEditing}>add recipe<i className='icon-btn'><BsFillPlusCircleFill/></i></button></NavLink>
                </div>
                <div className='underline'></div>
            </div>
        </>
    )
}

export default Navigation;