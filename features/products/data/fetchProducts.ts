import {localDatabase} from "../../../local_database";

export  const getAllProducts =  ()=> {
    return   localDatabase
        .get("products")
        .query().observe()
};