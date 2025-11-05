package com.examplatform.service;

import com.examplatform.model.Question;
import com.examplatform.model.QuizResult;
import com.examplatform.model.User;
import com.examplatform.repository.QuestionRepository;
import com.examplatform.repository.QuizResultRepository;
import com.examplatform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class QuizService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuizResultRepository quizResultRepository;

    @Autowired
    private UserRepository userRepository;

    // ✅ Fetch random 5 questions by subject
    public List<Question> getQuestionsBySubject(String subject) {
        List<Question> all = questionRepository.findBySubject(subject);
        Collections.shuffle(all);
        return all.stream().limit(5).toList();
    }

    // ✅ Calculate score, save result, update user total
    public int submitQuiz(String userId, String subject, Map<String, String> answers) {
        List<Question> questions = questionRepository.findBySubject(subject);
        int score = 0;

        System.out.println("\n=== DEBUG START ===");
        System.out.println("User Answers Received: " + answers);
        System.out.println("Questions from MongoDB: " + questions.size());

        for (Question q : questions) {
            String selected = answers.get(q.getId());
            System.out.println("\nQuestion ID: " + q.getId());
            System.out.println("Question Text: " + q.getQuestionText());
            System.out.println("Correct Answer (DB): '" + q.getCorrectAnswer() + "'");
            System.out.println("Selected Answer (User): '" + selected + "'");

            if (selected != null && selected.trim().equalsIgnoreCase(q.getCorrectAnswer().trim())) {
                System.out.println("✅ Correct");
                score++;
            } else {
                System.out.println("❌ Incorrect");
            }
        }

        System.out.println("=== DEBUG END ===");
        System.out.println("Final Score: " + score);

        // ✅ Save the quiz result
        QuizResult result = new QuizResult();
        result.setUserId(userId);
        result.setSubject(subject);
        result.setScore(score);
        result.setDateTaken(new Date());
        quizResultRepository.save(result);

        // ✅ Update user score safely (no lambda)
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            int updatedScore = user.getTotalScore() + score;
            user.setTotalScore(updatedScore);
            userRepository.save(user);
        }

        return score;
    }



    // ✅ Leaderboard — fixed generic type issue
    public List<Map<String, Object>> getLeaderboard() {
        List<User> users = userRepository.findAll();

        // Sort users by score (descending) and limit to 10
        users.sort((u1, u2) -> Integer.compare(u2.getTotalScore(), u1.getTotalScore()));

        List<Map<String, Object>> leaderboard = new ArrayList<>();
        for (User u : users.stream().limit(10).toList()) {
            Map<String, Object> entry = new HashMap<>();
            entry.put("username", u.getUsername());
            entry.put("totalScore", u.getTotalScore());
            leaderboard.add(entry);
        }

        return leaderboard;
    }
}
