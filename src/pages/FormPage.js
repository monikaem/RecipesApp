import '../styles/FormPage.css'
import {useGlobalContext} from "../AppContext";
import {Link} from "react-router-dom";
import IngredientInput from "../components/IngredientInput";

const FormPage = () => {
    const {handleSubmit, isEditingActive, deactivateEditing, newRecipe, handleAddNewIngredient, handleChange} = useGlobalContext();
    return (
        <>
            <div className='form-container'>
                <form>
                    <h2>Add your own recipe!</h2>
                    <div className='form-control'>
                        <label htmlFor='title'>Dish Name: </label>
                        <input type='text' name='title' value={newRecipe.title} onChange={handleChange} id='title'/>
                    </div>
                    <div className='form-control'>
                    <label htmlFor='img'>Image URL: </label>
                    <input type='text' name='img' value={newRecipe.img} onChange={handleChange} id='img'/>
                    </div>
                    <div className='form-control'>
                    <label htmlFor='notes'>Your notes: </label>
                    <input type='text' name='notes' value={newRecipe.notes} onChange={handleChange} id='notes'/>
                    </div>
                    <div className='form-control-container'>
                        {newRecipe.ingredients.map((ingredient, index) => {
                            return (
                            <IngredientInput {...ingredient} id={index} key={index}/>
                            )
                        })}
                        <button className='btn-ingredient' onClick={handleAddNewIngredient}>Add Ingredient</button>
                    </div>

                    <Link to='/'><button className='btn' onClick={deactivateEditing}>Cancel</button></Link>
                    <button type='submit' className='btn' onClick={handleSubmit}>{isEditingActive ? 'Edit Recipe' : 'Add Recipe'}</button>
                </form>
            </div>
        </>
    )
}

export default FormPage;