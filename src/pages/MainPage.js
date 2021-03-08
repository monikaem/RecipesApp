import '../styles/MainPage.css'
import Recipes from "../components/Recipes";

const MainPage = () => {
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