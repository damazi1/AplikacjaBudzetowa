package pczstudent.pracainz.budgetmanagementapp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import pczstudent.pracainz.budgetmanagementapp.model.Wallet;

import java.util.List;

@RepositoryRestResource
public interface WalletRepository extends MongoRepository<Wallet,String> {
    public List<Wallet> findByUserId(String username);
}
