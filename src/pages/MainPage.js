import '../styles/MainPage.css'
import Recipes from "../components/Recipes";
import {useGlobalContext} from "../AppContext";

const MainPage = () => {
    const {isLoading} = useGlobalContext();

    if (isLoading) {
        return (
            <div className='items-container'>
            <h1 className='loading'>Loading...</h1>
            </div>
        )
    }
    return (
            <div className='items-container'>
                <section className="recipes-section">
                    <div className="title">
                        <h2>our recipes</h2>
                    </div>
                    <div className='recipes-list'>
                       <Recipes/>
                    </div>
                </section>
            </div>
    )
}

export default MainPage;