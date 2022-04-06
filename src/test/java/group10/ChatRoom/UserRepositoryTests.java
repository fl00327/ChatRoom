package group10.ChatRoom;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.annotation.Rollback;

import group10.ChatRoom.entities.User;
import group10.ChatRoom.repositories.UserRepository;

@DataJpaTest
@AutoConfigureTestDatabase(replace=Replace.NONE)
@Rollback(false)
public class UserRepositoryTests {
    
    @Autowired
    private UserRepository repo;

    @Autowired
    private TestEntityManager entityManger;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Test
    public void testCreateUser(){
        //RUN THIS CLASS ONLY TO CREATE TABLES
        User user = new User();
        user.setEmail("test2@email.com");
        user.setPassword(encoder.encode("password123"));
        user.setFirstName("Jack");
        user.setLastName("Skinner");

        User savedUser = repo.save(user);

        User existUser = entityManger.find(User.class, savedUser.getId());

        assertThat(existUser.getEmail()).isEqualTo(user.getEmail());
    }

    @Test //Test if user can be found by email, email must = a registered user
    public void testFindUserByEmail(){
        String email = "testemail@gmail.com";

        User user = repo.findByEmail(email);

        assertThat(user).isNotNull();
    }

    @Test //Test if null will be returned when unregistered email is entered
    public void testCannotFindUserByEmail(){
        String email = "notregistered@email.com";

        User user = repo.findByEmail(email);

        assertThat(user).isNull();
    }

}
