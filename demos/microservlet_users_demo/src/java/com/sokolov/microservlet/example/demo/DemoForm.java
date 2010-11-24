package com.sokolov.microservlet.example.demo;

import com.sokolov.microservlet.RequestFormImpl;
import com.sokolov.microservlet.dto.ValidationError;

import java.util.List;


public class DemoForm extends ListForm {

    private Long id;

    private String name;

    private String position;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void validate() {
        if ((getName() == null) || ("".equals(getName()))) {
            //ValidationError validationError = new ValidationError();
            //validationError.setBundleKey("name.empty.error");
            ValidationError validationError = new ValidationError("Name can't be empty.");
            getErrors().add(validationError);
        }
    }


}
