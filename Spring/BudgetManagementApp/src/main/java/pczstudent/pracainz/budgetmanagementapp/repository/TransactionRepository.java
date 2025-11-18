package pczstudent.pracainz.budgetmanagementapp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import pczstudent.pracainz.budgetmanagementapp.dto.WalletBarChartDto;
import pczstudent.pracainz.budgetmanagementapp.model.Transaction;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@RepositoryRestResource
public interface TransactionRepository extends MongoRepository<Transaction, String> {

   List<Transaction> findByAccountId(String accountId);

    Collection<Transaction> findByWalletIdAndDateBetween(String walletId, Date dateAfter, Date dateBefore);

    List<Transaction> findAllByAccountIdOrAccountToIdOrderByDateDesc(String accountId, String accountId1);

    Collection<Transaction> findByAccountIdAndDateBetween(String id, Date from, Date to);

    Collection<Transaction> findByAccountToIdAndDateBetween(String id, Date from, Date to);
}
