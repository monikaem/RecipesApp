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
// jesli chodzi o stukture projektu - ja lubie podejscie ficzerowe: https://reactjs.org/docs/faq-structure.html
// jesli chcielibysmy miec tu uklad taki, jak w moich sluzbowych projektach, to:
// - na glownym poziomie mielibysmy index, App, Navigation, Page, AppContext (jesli w ogole jest potrzebny) 
// - a w components mielibysmy foldery recipes i recipe i tam juz porozdzielane pliki tematycznie w zaleznosci od tego, na ktorej stronce sa uzywane
// no ale to pewnie kwestia gustu - tylko jak wyobrazimy sobie, ze przy obecnej strukturze projekt rosnie, to w components ciezko byloby sie polapac

