import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

import com.sokolov.microservlet.RequestFormUtilTest;

/**
 * Main test class AllTests.
 * @author Helio Frota
 *
 */
@RunWith(value = Suite.class)
@SuiteClasses(value = {
    RequestFormUtilTest.class
})
public class AllTests {

}
