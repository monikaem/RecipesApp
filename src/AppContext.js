import React, {useState, useEffect, useContext, createContext} from 'react';

const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditingActive, setIsEditingActive] = useState(false);
    const [editID, setEditID] = useState(null);
    const [newRecipe, setNewRecipe] = useState({title: '', img: '', ingredients: [], notes: ''});


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

    useEffect(() => {
        fetchRecipes();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('dodano')
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
        const newIngredient = {name: '', quantity: 0, unit: ''}
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
        <AppContext.Provider value={{isLoading, recipes, handleSubmit, activateEditing, isEditingActive, deactivateEditing, newRecipe,handleAddNewIngredient, handleChange, editID}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

