import EditPage from "../pages/EditPage";
import MainPage from "../pages/MainPage";
import FormPage from "../pages/FormPage";
import {Route, Switch} from "react-router";

const Page = () => {
    return (
        <>
            <main>
                <Switch>
                    <Route path='/' exact={true} component={MainPage}/>
                    <Route path='/add' exact={true} component={FormPage}/>
                    <Route pat='/edit' exact={true} component={EditPage}/>
{/* wystarczylyby tylko 2 strony: / - na przepisy i /recipe - na formularz przepisu, poniewaz zarowno FormPage jak i EditPage renderuja FormComponent w identyczny sposob */}
                </Switch>
            </main>
        </>
    )
}

export default Page;