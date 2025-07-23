package pczstudent.pracainz.budgetmanagementapp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import pczstudent.pracainz.budgetmanagementapp.model.Transaction;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource
public interface TransactionRepository extends MongoRepository<Transaction, String> {

   List<Transaction> findByAccountId(String accountId);
}
