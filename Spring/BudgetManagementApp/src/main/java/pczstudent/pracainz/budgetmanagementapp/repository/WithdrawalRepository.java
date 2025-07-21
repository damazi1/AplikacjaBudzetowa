package pczstudent.pracainz.budgetmanagementapp.repository;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import pczstudent.pracainz.budgetmanagementapp.model.Withdrawal;
import org.springframework.data.mongodb.repository.MongoRepository;

@RepositoryRestResource
public interface WithdrawalRepository extends MongoRepository<Withdrawal, String> {
    // Additional query methods can be defined here if needed
}
