package com.examplatform.repository;

import com.examplatform.model.Question;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface QuestionRepository extends MongoRepository<Question, String> {
    List<Question> findBySubject(String subject);
}
