import {errorMessages} from "../data/errorMessages";
import IngredientInput from "./IngredientInput";
import {Link} from "react-router-dom";
import Alert from "./Alert";
import {useGlobalContext} from "../AppContext";


const FormComponent = () => {
    const {handleSubmit, deactivateEditing, newRecipe, handleAddNewIngredient, handleChange, alert, showAlert, errors} = useGlobalContext();

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
                            placeholder='3-30 letters'
                        />
                    </div>
                    {errors.title && <p className='error-input'>{errorMessages.title_incorrect}</p>}
                    <div className='form-control'>
                        <label htmlFor='img'>Image URL: </label>
                        <input
                            type='text'
                            name='img'
                            value={newRecipe.img}
                            onChange={handleChange}
                            id='img'
                            placeholder='Paste the image URL here'
                        />
                    </div>
                    {errors.img && <p className='error-input'>{errorMessages.img_incorrect}</p>}
                    <div className='form-control'>
                        <label htmlFor='notes'>Your notes: </label>
                        <input
                            type='text'
                            name='notes'
                            value={newRecipe.notes}
                            onChange={handleChange}
                            id='notes'
                            placeholder='Optional'
                        />
                    </div>
                    <div className='form-ingredients-container'>
                        {newRecipe.ingredients.map((ingredient, index) => {
                            return (
                                <IngredientInput {...ingredient} id={index} key={index}/>
                            )
                        })}
                        {errors.ingredients && <p className='error-input'>{errorMessages.ingredients_incorrect}</p>}
                        <button className='btn-ingredient' onClick={handleAddNewIngredient}>Add Ingredient</button>
                    </div>

                    <Link to='/'><button className='btn' onClick={deactivateEditing}>Cancel</button></Link>
                    <button type='submit' className='btn' onClick={handleSubmit}>Save Recipe</button>
                    {/* a po submicie fajnie byloby wrocic na glowna strone */}
                </form>
                {alert.show && <Alert {...alert} removeAlert={showAlert} newRecipe={newRecipe} />}
            </div>
        </>
    )
}

export default FormComponent;