import React, {createContext, useContext, useEffect, useState} from 'react';


const AppContext = createContext();

export const AppProvider = ({children}) => {
    const URL = 'https://monikatest1.free.beeceptor.com/recipes';
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditingActive, setIsEditingActive] = useState(false);
    const [editID, setEditID] = useState(null);
    const [newRecipe, setNewRecipe] = useState({title: '', img: '', ingredients: [], notes: ''});
    const [alert, setAlert] = useState({show: false, msg: '', type: ''});
    const [errors, setErrors] = useState({title: false, img: false, ingredients: false,})

    const validateForm = () => {
        const {title, img, ingredients} = newRecipe;
        let titleValid = true; // true = OK (no error message)
        let imgValid = true;
        const ingredientsArrayErrors = [];
            if (title.length < 3 || title.length > 30) {
                titleValid = false;
            }
            if (!img) {
                imgValid = false;
            }
            if (ingredients.length) {
                ingredients.forEach((ingredient, index) => {
                    const ingredientErrors = {};
                    if (ingredient.name.length < 3 || ingredient.name.length > 30 ){
                        ingredientErrors.name = true;
                    }
                    if (ingredient.quantity <= 0) {
                        ingredientErrors.quantity = true;
                    }
                    if (!ingredient.unit) {
                        ingredientErrors.unit = true;
                    }
                    if (ingredientErrors.name || ingredientErrors.quantity || ingredientErrors.unit) {
                        ingredientsArrayErrors[index] = ingredientErrors;
                    }
                })
            }
            let correct = (titleValid && imgValid && !ingredientsArrayErrors.length);
            return ({
                correct,
                titleValid,
                imgValid,
                ingredientsArrayErrors,
            })
        }

    const fetchRecipes = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(URL);
            const recipesData = await response.json();
            setRecipes(recipesData);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    const saveRecipe = (recipe) => {
        if (!isEditingActive) {
            try {
                return fetch(URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({recipe})
                }).then(resp => resp.json());
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                console.log(recipe.id)
                return fetch(URL + '/' + recipe.id, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({recipe})
                }).then(resp => resp.json());
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        fetchRecipes();
    }, [])

    const showAlert = (show = false, type = '', msg = '') => {
        setAlert({show, type, msg});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validation = validateForm();
        if (validation.correct) {
            saveRecipe(newRecipe);
            setNewRecipe({title: '', img: '', ingredients: [], notes: ''})
            showAlert(true, 'success', `item successfully ${isEditingActive ? 'updated' : 'added'}`);
            setErrors({title: false, img: false, ingredients: false})
            setIsEditingActive(false);
        } else {
            showAlert(true, 'danger', 'Check the form again');
            setErrors({title: !validation.titleValid, img: !validation.imgValid, ingredients: Boolean(validation.ingredientsArrayErrors.length)})
        }
    }

    const activateEditing = (id) => {
        setIsEditingActive(true);
        setEditID(id);
        const editedRecipe = recipes[id]
        setNewRecipe(editedRecipe);
    }

    const deactivateEditing = () => {
        setIsEditingActive(false);
        setEditID(null);
        setNewRecipe({title: '', img: '', ingredients: [], notes: ''})
    }

    const handleAddNewIngredient = (e) => {
        e.preventDefault();
        const newIngredient = {name: '', quantity: 1, unit: ''}
        const ingredients = [...newRecipe.ingredients];
        const newIngredients = [...ingredients, newIngredient]
        setNewRecipe({...newRecipe, ingredients: newIngredients})
    }

    const handleChange = (e) => {
        if (["name", "quantity", "unit"].includes(e.target.className)) {
            let ingredients = [...newRecipe.ingredients]
            ingredients[e.target.dataset.id][e.target.className] = e.target.value
            setNewRecipe({...newRecipe, ingredients})
        } else {
            const name = e.target.name;
            const value = e.target.value;
            setNewRecipe({...newRecipe, [name]: value})
        }
    }


    return (
        <AppContext.Provider value={{
            isLoading,
            recipes,
            handleSubmit,
            activateEditing,
            isEditingActive,
            deactivateEditing,
            newRecipe,
            handleAddNewIngredient,
            handleChange,
            editID,
            alert,
            showAlert,
            errors
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

