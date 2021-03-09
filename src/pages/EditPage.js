import {useGlobalContext} from "../AppContext";
import IngredientInput from "../components/IngredientInput";
import {Link} from "react-router-dom";
import Alert from "../components/Alert";
import {messages} from "../data/errorMessages";
import {Route, Redirect} from "react-router";

const EditPage = () => {
    const {handleSubmit, deactivateEditing, handleAddNewIngredient, handleChange, newRecipe, showAlert, alert, errors, isEditingActive} = useGlobalContext();

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
                            onChange={handleChange} id='title'
                        />
                        {errors.title && <p className='error-input'>{messages.title_incorrect}</p>}
                    </div>
                    <div className='form-control'>
                        <label htmlFor='img'>Image URL: </label>
                        <input
                            type='text'
                            name='img'
                            value={newRecipe.img}
                            onChange={handleChange}
                            id='img'
                        />
                        {errors.img && <p className='error-input'>{messages.img_incorrect}</p>}
                    </div>
                    <div className='form-control'>
                        <label htmlFor='notes'>Your notes: </label>
                        <input
                            type='text'
                            name='notes'
                            value={newRecipe.notes}
                            onChange={handleChange}
                            id='notes'
                        />
                    </div>
                    <div className='form-ingredients-container'>
                        {newRecipe.ingredients.map((ingredient, index) => {
                            return (
                                <IngredientInput {...ingredient} id={index} key={index}/>
                            )
                        })}
                        {errors.ingredients && <p className='error-input'>{messages.ingredients_incorrect}</p>}
                        <button className='btn-ingredient' onClick={handleAddNewIngredient}>Add Ingredient</button>
                    </div>

                    <Link to='/'><button className='btn' onClick={deactivateEditing}>Cancel</button></Link>
                    <button type='submit' className='btn' onClick={handleSubmit}>Edit Recipe</button>
                    <Route render={() => isEditingActive ? null : <Redirect to="/add"/>}/>
                </form>
                {alert.show && <Alert {...alert} removeAlert={showAlert} newRecipe={newRecipe} />}
            </div>
        </>
    )
}

export default EditPage;