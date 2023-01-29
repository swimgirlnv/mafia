package client;


import java.net.URI;
import java.io.IOException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import openai.TextCompletion;
import com.google.gson.Gson;


public class MafiaGenerator {
 protected ApiClient client = new ApiClient();


 /**
  * Makes API call to GPT-3
  * @param playerName The name of the player who dies.
  * @return Gson string from Open AI that includes request id, object, created, model, choices,
  * text, index, logprobs, and finish_reason.
  */
 public String playerDeath(String playerName) {
     try {
       String reqUri = "https://api.openai.com/v1/completions";


       String apiKey = ClientAuthenticator.getApiKey();


       HttpRequest request = HttpRequest.newBuilder()
           .uri(URI.create(reqUri))
           .header("Content-Type", "application/json")
           .header("Authorization", "Bearer " + apiKey)
           .POST(HttpRequest.BodyPublishers.ofString(
               "{\"model\": \"text-davinci-003\", \"prompt\": \"" + playerName
                   + " was a college student who enjoyed camping and was purposefully murdered by the mafia. write a short news article without a headline describing the amusing way she died. \", \"temperature\": 1, \"max_tokens\": 250}"))
           .build();
       String httpResponse = client.makeRequest(request);
       Gson gson = new Gson();
       TextCompletion textCompletion = gson.fromJson(httpResponse, TextCompletion.class);
       return textCompletion.choices[0].text;
     } catch (Exception e) {
       return e.getMessage();
     }
   }


 }

