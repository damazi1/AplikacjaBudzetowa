package pczstudent.pracainz.budgetmanagementapp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import pczstudent.pracainz.budgetmanagementapp.model.Account;

import java.util.List;

@RepositoryRestResource
public interface AccountRepository extends MongoRepository<Account, String> {
    List<Account> findByUserId(String userId);
}
