package com.sokolov;

import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Retention;

@Retention(value = RetentionPolicy.RUNTIME)
public @interface  Test1 {
    Class clazz();
}
