import {useGlobalContext} from "../AppContext";
import IngredientInput from "../components/IngredientInput";
import {Link} from "react-router-dom";

const EditPage = () => {
    const {handleSubmit, isEditingActive, deactivateEditing, newRecipe, handleAddNewIngredient, handleChange, editID, recipes} = useGlobalContext();

    return (
        <>
            <div className='form-container'>
                <form>
                    <h2>Add your own recipe!</h2>
                    <div className='form-control'>
                        <label htmlFor='title'>Dish Name: </label>
                        <input
                            type='text'
                            name='title'
                            value={recipes[editID].title}
                            onChange={handleChange} id='title'
                        />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='img'>Image URL: </label>
                        <input
                            type='text'
                            name='img'
                            value={recipes[editID].img}
                            onChange={handleChange}
                            id='img'
                        />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='notes'>Your notes: </label>
                        <input
                            type='text'
                            name='notes' v
                            alue={recipes[editID].notes}
                            onChange={handleChange}
                            id='notes'
                        />
                    </div>
                    <div className='form-ingredients-container'>
                        {recipes[editID].ingredients.map((ingredient, index) => {
                            return (
                                <IngredientInput {...ingredient} id={index} key={index}/>
                            )
                        })}
                        <button className='btn-ingredient' onClick={handleAddNewIngredient}>Add Ingredient</button>
                    </div>

                    <Link to='/'><button className='btn' onClick={deactivateEditing}>Cancel</button></Link>
                    <button type='submit' className='btn' onClick={handleSubmit}>Edit Recipe</button>
                </form>
            </div>
        </>
    )
}

export default EditPage;