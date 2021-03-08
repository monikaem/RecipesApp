import {useGlobalContext} from "../AppContext";
import '../styles/RecipeItem.css'
import {RiEdit2Fill} from "react-icons/ri"
import {Link} from "react-router-dom";

const RecipeItem = ({img, title, ingredients, id}) => {
    const {activateEditing} = useGlobalContext();
    return (
        <article className='recipe-item'>
            <img src={img} alt={title} className='photo'/>
            <div className='recipe-info'>
                <header>
                    <h4>{title}</h4>
                </header>
                <p>Ingredients:</p>
                <ul className='ingredients-list'>
                    {ingredients.map((ingredient, index) => {
                        return (
                            <li key={index}>{ingredient.name} - {ingredient.quantity} {ingredient.unit}</li>
                        )
                    })}

                </ul>
                <Link to="/edit"><button className='btn' onClick={() => activateEditing(id)}>Edit <RiEdit2Fill/></button></Link>
            </div>
        </article>
    )
}

export default RecipeItem;