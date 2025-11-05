package com.examplatform.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "quiz_results")
public class QuizResult {

    @Id
    private String id;
    private String userId;
    private String subject;
    private int score;
    private Date dateTaken;

    public QuizResult() {}

    public QuizResult(String userId, String subject, int score, Date dateTaken) {
        this.userId = userId;
        this.subject = subject;
        this.score = score;
        this.dateTaken = dateTaken;
    }

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public Date getDateTaken() { return dateTaken; }
    public void setDateTaken(Date dateTaken) { this.dateTaken = dateTaken; }
}
