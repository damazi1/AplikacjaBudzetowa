package pczstudent.pracainz.budgetmanagementapp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import pczstudent.pracainz.budgetmanagementapp.model.Transfer;

import java.util.List;

@RepositoryRestResource
public interface TransferRepository extends MongoRepository<Transfer, String> {
    List<Transfer> findByFromAccountNumber(String fromAccountNumber);
}
