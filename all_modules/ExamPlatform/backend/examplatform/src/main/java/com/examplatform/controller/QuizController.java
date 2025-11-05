package com.examplatform.controller;

import com.examplatform.model.Question;
import com.examplatform.repository.QuestionRepository;
import com.examplatform.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "http://localhost:5173")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @Autowired
    private QuestionRepository questionRepository;

    // ✅ Fetch random 5 questions by subject
    @GetMapping("/{subject}")
    public List<Question> getQuestions(@PathVariable String subject) {
        return quizService.getQuestionsBySubject(subject);
    }

    // ✅ Submit quiz and calculate score
    @PostMapping("/submit")
    public ResponseEntity<?> submitQuiz(@RequestBody Map<String, Object> submissionData) {
        try {
            // Extract required data
            String userId = (String) submissionData.get("userId");
            String subject = (String) submissionData.get("subject");

            // Safely parse "answers" map
            Object answersObj = submissionData.get("answers");
            Map<String, String> answers = new HashMap<>();

            if (answersObj instanceof Map<?, ?> rawMap) {
                for (Map.Entry<?, ?> entry : rawMap.entrySet()) {
                    if (entry.getKey() instanceof String key && entry.getValue() instanceof String value) {
                        answers.put(key, value);
                    }
                }
            }

            // ✅ Debug logs (to verify matching question IDs and answers)
            System.out.println("Received submission for subject: " + subject);
            System.out.println("User: " + userId);
            System.out.println("Answers received: " + answers);

            // ✅ Calculate score
            int score = quizService.submitQuiz(userId, subject, answers);

            // ✅ Return response
            return ResponseEntity.ok(Map.of(
                    "message", "Quiz submitted successfully!",
                    "subject", subject,
                    "score", score
            ));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(Map.of(
                    "error", "Invalid request format",
                    "details", e.getMessage()
            ));
        }
    }

    // ✅ Fetch leaderboard
    @GetMapping("/leaderboard")
    public List<Map<String, Object>> leaderboard() {
        return quizService.getLeaderboard();
    }
}
