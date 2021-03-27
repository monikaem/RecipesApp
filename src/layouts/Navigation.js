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

// nie swieci nam sie w nawigacji aktywny link, a jak poczytamy w dokumentacji NavLinka aktywnemu dodaje sie domyslnie klasa active
// wystarczy ostylowac taka klase i juz sie zaswieci (styl ponizej jest zupelnie przypadkowy):
// .active .btn { background-color: aqua;}
// a zeby sie za duzo nie swiecilo, to uzywamy exact: https://reactrouter.com/web/api/NavLink

export default Navigation;