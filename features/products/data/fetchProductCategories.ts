import { Observable } from "@nozbe/watermelondb/utils/rx";
import {localDatabase} from "../../../local_database";
import ModelProductCategory from "../../../local_database/model/model.productCategory";
import {Model} from "@nozbe/watermelondb";

export  const getAllCategories  =  ():Observable<Model[]>=> {
   return   localDatabase
        .get("product_categories")
       .query().observe();
};