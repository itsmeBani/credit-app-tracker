import { CustomerInsertPayload } from "../types";
import { localDatabase } from "../../../local_database";
import ModelCustomers from "../../../local_database/model/modelCustomers";
import { Q } from "@nozbe/watermelondb";

export class CustomersRepository {
    private collection = localDatabase.get<ModelCustomers>("customers");


    async create(payload: CustomerInsertPayload): Promise<ModelCustomers> {
        const now = Date.now();

        return await this.collection.create((customer) => {
            customer.firstname = payload.firstname;
            customer.lastname = payload.lastname;
            customer.createdAt = now;
            customer.updatedAt = now;
            customer.deletedAt = null;
        });
    }

    getObservedCustomers(search: string) {
        const safeSearch = `%${Q.sanitizeLikeString(search)}%`;

        return this.collection
            .query(
                Q.sortBy("first_name", Q.asc),
                Q.sortBy("last_name", Q.asc),
                Q.or(
                    Q.where("first_name", Q.like(safeSearch)),
                    Q.where("last_name", Q.like(safeSearch))
                )
            )
            .observeWithColumns([
                "first_name",
                "last_name",
                "created_at",
                "updated_at",
                "_status",
            ]);
    }
}