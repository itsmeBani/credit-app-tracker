import {localDatabase} from "../../../../local_database";
import {useQuery} from "@tanstack/react-query";
import ModelProductCategory from "../../../../local_database/model/model.productCategory";





export const getUsers = async () => {
    const usersCollection = localDatabase.get('product_categories')

    return await usersCollection.query().fetch()
}


export const useUsers = () => {
    return useQuery({
        queryKey: ['products'
        ],
        queryFn: getUsers
    })
}