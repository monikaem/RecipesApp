import {useGlobalContext} from "../AppContext";
import RecipeItem from "./RecipeItem";

const Recipes = () => {
    const {recipes} = useGlobalContext();

    return (
        <div className='recipes-section-center'>
            {recipes.map(recipe => {
                return <RecipeItem {...recipe} key={recipe.id}/>
            })}

        </div>
    )
}

export default Recipes;


