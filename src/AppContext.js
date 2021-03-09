import React, {createContext, useContext, useEffect, useState} from 'react';

const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditingActive, setIsEditingActive] = useState(false);
    const [editID, setEditID] = useState(null);
    const [newRecipe, setNewRecipe] = useState({title: '', img: '', ingredients: [], notes: ''});
    const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
    const [errors, setErrors] = useState({title: false, img: false})

    const formValidation = () => {
        const {title, img} = newRecipe;
        let titleValid = false;
        let imgValid = false;
        let correct = false;
        if (title.length >= 3 && title.length < 30) {
            titleValid = true;
        }
        if (img) {
            imgValid = true;
        }
        if (titleValid && imgValid) {
            correct = true;
        }
            return ({
                correct,
                titleValid,
                imgValid,
            })
    }


    const fetchRecipes = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://monikaa4.free.beeceptor.com/recipes');
            const recipesData = await response.json();
            setRecipes(recipesData);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    const saveRecipe = (recipe) => {
        console.log('recipe to save: ' + recipe);
        try {
            return fetch('https://monikaa4.free.beeceptor.com/recipes',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({recipe})
            }).then(resp => resp.json());
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchRecipes();
    }, [])

    const showAlert = (show = false, type = '', msg = '') => {
        setAlert({ show, type, msg });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const validation = formValidation();
        if (validation.correct) {
            saveRecipe(newRecipe);
            setNewRecipe({title: '', img: '', ingredients: [], notes: ''})
            showAlert(true, 'success', 'item added to the list');
            setErrors({title: false, img: false})
        } else {
            showAlert(true, 'danger', 'Check the form again');
            setErrors({title: !validation.titleValid, img: !validation.imgValid})
            console.log(validation)
        }
    }
    const activateEditing = (id) => {
        setIsEditingActive(true);
        setEditID(id);
    }

    const deactivateEditing = () => {
        setIsEditingActive(false);
        setEditID(null);
    }

    const handleAddNewIngredient = (e) => {
        e.preventDefault();
        const newIngredient = {name: '', quantity: 1, unit: ''}
        const ingredients = [...newRecipe.ingredients];
        const newIngredients = [...ingredients, newIngredient]
        setNewRecipe({...newRecipe, ingredients: newIngredients})
    }

    const handleChange = (e) => {
        if (["name", "quantity", "unit"].includes(e.target.className) ) {
            let ingredients = [...newRecipe.ingredients]
            ingredients[e.target.dataset.id][e.target.className] = e.target.value
            setNewRecipe({...newRecipe, ingredients})
        } else {
            const name = e.target.name;
            const value = e.target.value;
            setNewRecipe({...newRecipe, [name]: value })
        }
    }


    return (
        <AppContext.Provider value={{isLoading, recipes, handleSubmit, activateEditing, isEditingActive, deactivateEditing, newRecipe,handleAddNewIngredient, handleChange, editID, alert, showAlert, errors}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

