package com.sokolov.microservlet;

import javax.servlet.http.HttpServletRequest;

import org.junit.Test;
import org.mockito.Mockito;

/**
 * Test class RequestFormUtilTest.
 * @author helio frota
 *
 */
public class RequestFormUtilTest {

	/**
	 * Test method getRequestForm.
	 */
	@Test
    public void getRequestForm() {
        HttpServletRequest httpServletRequest = Mockito.mock(HttpServletRequest.class);
        httpServletRequest.getAttribute("");
    }

}
