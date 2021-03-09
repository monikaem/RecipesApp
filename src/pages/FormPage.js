import '../styles/FormPage.css'
import {useGlobalContext} from "../AppContext";
import {Link} from "react-router-dom";
import IngredientInput from "../components/IngredientInput";
import Alert from "../components/Alert";

const FormPage = () => {
    const {handleSubmit, isEditingActive, deactivateEditing, newRecipe, handleAddNewIngredient, handleChange, alert, showAlert, errors} = useGlobalContext();
    const messages = {
        title_incorrect: 'Empty dish name value!!',
        img_incorrect: 'Check the URl of the image!',
    }
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
                            value={newRecipe.title}
                            onChange={handleChange}
                            id='title'
                        />
                    </div>
                    {errors.title && <p className='error-input'>{messages.title_incorrect}</p>}
                    <div className='form-control'>
                        <label htmlFor='img'>Image URL: </label>
                        <input
                            type='text'
                            name='img'
                            value={newRecipe.img}
                            onChange={handleChange}
                            id='img'
                        />
                    </div>
                    {errors.img && <p className='error-input'>{messages.img_incorrect}</p>}
                    <div className='form-control'>
                        <label htmlFor='notes'>Your notes: </label>
                        <input
                            type='text'
                            name='notes'
                            value={newRecipe.notes}
                            onChange={handleChange}
                            id='notes'/>
                    </div>
                    <div className='form-ingredients-container'>
                        {newRecipe.ingredients.map((ingredient, index) => {
                            return (
                            <IngredientInput {...ingredient} id={index} key={index}/>
                            )
                        })}
                        <button className='btn-ingredient' onClick={handleAddNewIngredient}>Add Ingredient</button>
                    </div>

                    <Link to='/'><button className='btn' onClick={deactivateEditing}>Cancel</button></Link>
                    <button type='submit' className='btn' onClick={handleSubmit}>Add Recipe</button>
                </form>
                {alert.show && <Alert {...alert} removeAlert={showAlert} newRecipe={newRecipe} />}
            </div>
        </>
    )
}

export default FormPage;