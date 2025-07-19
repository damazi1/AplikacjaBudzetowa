package pczstudent.pracainz.budgetmanagementapp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import pczstudent.pracainz.budgetmanagementapp.model.Transaction;

@RepositoryRestResource
public interface TransactionRepository extends MongoRepository<Transaction, String> {

}
