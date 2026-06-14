import {useState} from "react";
import {creditsService} from "../services/credits.service";

import ModelProducts from "../../../local_database/model/model.products";
import {appToast} from "../../../shared/components/toast";

export  const  useCreateItemsCredit=()=>{
    const [loading,setLoading]=useState(false)

    const createItemsCredit=async (creditId:string,productSelected:ModelProducts[])=>{
        setLoading(true)
        await creditsService.createCreditItems(
            creditId,
            productSelected
        );


        setLoading(false)

    }

    return {
        loading,
        createItemsCredit
    }
}