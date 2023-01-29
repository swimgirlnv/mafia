package client;




import java.net.URI;
import java.net.http.HttpRequest;


/**
* This class generates the HttpRequests that are then used to make requests from the ApiClient.
* @author Daniel Graves
*/
public final class ClientRequestGenerator {


 /**
  * constructor that ensures the class can never be instantiated.
  */
 private ClientRequestGenerator() {
 }


 /**
  * method that returns a request for a getRequest for student info.
  * @param url the url of the requested endpoint
  * @param apiKey the apiKey that authenticates the user
  * @param login the login corresponding the apiKey
  * @return an HttpRequest (get request) with the given inputs and to the given endpoint
  */
 public static HttpRequest getSecuredGetRequest(String url, String apiKey, String login) {
   String reqUri = url + "?auth=" + login + "&key=" + apiKey;
   return HttpRequest.newBuilder()
       .uri(URI.create(reqUri))
       .build();
 }


 /**
  * method that returns a request for a getRequest for student match.
  * @param url the url of the requested endpoint
  * @param apiKey the apiKey that authenticates the user
  * @param login the login corresponding the apiKey
  * @return an HttpRequest (post request) with the given inputs and to the given endpoint
  */
 public static HttpRequest getSecuredPostRequest(String url, String apiKey, String login) {
   return HttpRequest.newBuilder()
       .uri(URI.create(url))
       .header("x-api-key", apiKey)
       .POST(HttpRequest.BodyPublishers.ofString("{\"auth\": \"" + login + "\"}"))
       .build();
 }
}
