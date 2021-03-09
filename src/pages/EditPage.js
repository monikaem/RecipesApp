import {useGlobalContext} from "../AppContext";
import {Route, Redirect} from "react-router";
import FormComponent from "../components/FormComponent";

const EditPage = () => {
    const {isEditingActive} = useGlobalContext();

    return (
        <>
            <FormComponent/>
            <Route render={() => isEditingActive ? null : <Redirect to="/add"/>}/>
        </>
    )
}

export default EditPage;