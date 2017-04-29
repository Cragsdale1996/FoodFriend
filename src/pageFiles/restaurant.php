<?php

function checkSession($app, $sessionID)
{
	// Delete expired sessions from Sessions table
	$DeleteExpiredQuery = $app->db->prepare("DELETE FROM Sessions WHERE NOW() >= time_expires");
	$DeleteExpiredQuery->execute();

	// Query sessions table for session ID passed in
	$sessionsQuery = $app->db->prepare("SELECT * FROM Sessions WHERE session_id=:sid");
	$sessionsQuery->bindParam("sid", $sessionID);
	$sessionsQuery->execute();

	$sessionInfo = $sessionsQuery->fetch();
	if(empty($sessionInfo)) return 'n'; // if no current session has this session ID, return false

	if($sessionInfo['is_restaurant'] == "1") return 'r'; // if session is rest account, return 'r' char
	else return 'u'; // if session is user account, return 'u' char
}

$app->get('/restaurant/[{session_id}]', function($request, $response, $args)
{
	if(checkSession($this, $args['session_id']) === 'r')
	{
		// Query RestAccounts based on the current restaurant
		$restQuery = $this->db->prepare("SELECT name, city, state_post_code, category, rest_id" .
						" FROM RestAccount, Sessions WHERE RestAccount.rest_id = Sessions.account_id AND session_id=:sid");
		$restQuery->bindParam("sid", $args['session_id']);
		$restQuery->execute();
		$restInfo = $restQuery->fetchObject();	

		// Query Dishes for number of dishes and dish info
		$dishesQuery = $this->db->prepare("SELECT COUNT(rest_id) AS dishesNum FROM Dishes GROUP BY rest_id HAVING rest_id=" . $restInfo->rest_id);
		$dishesQuery->execute();
		$dishesNum = $dishesQuery->fetchObject()->dishesNum;

		$dishesQuery = $this->db->prepare("SELECT dish_id, name, description, score FROM Dishes WHERE rest_id=" . $restInfo->rest_id);
		$dishesQuery->execute();
		$dishes = $dishesQuery->fetchAll();

		$i = 0;
		$dishArrayJson = "[";
		while($i < $dishesNum - 1)
		{
			$dishArrayJson .= "{\"dish_id\" : \"" . $dishes[$i]['dish_id'] . "\",".
				      "\"name\" : \"" . $dishes[$i]['name'] . "\",".
				      "\"description\" : \"" . $dishes[$i]['description'] . "\",".
				      "\"score\" : \"" . $dishes[$i]['score'] . "\"},";
			$i++;
		}

		$dishArrayJson .= "{\"dish_id\" : \"" . $dishes[$i]['dish_id'] . "\",".
                                   "\"name\" : \"" . $dishes[$i]['name'] . "\",".
                                   "\"description\" : \"" . $dishes[$i]['description'] . "\",".
                                   "\"score\" : \"" . $dishes[$i]['score'] . "\"}";
		$dishArrayJson .= "]";

		// Craft response
		$jsonResponse = "{".
				"\"rest_name\" : \"" . $restInfo->name . "\"," .
				"\"city\" : \"" . $restInfo->city . "\"," .
				"\"state\" : \"" . $restInfo->state_post_code . "\"," .
				"\"category\" : \"" . $restInfo->category . "\"," .
				"\"numberOfDishes\" : " . $dishesNum . "\"," .
				"\"dishes\" : " . $dishArrayJson .
				"}";

		// Set response body
		$this->response->getBody()->write($jsonResponse);
		return $this->response;
	}

	$this->response = $this->response->withStatus(401);
	return $this->response;
});

$app->post('/restaurant/addDishes', function($request, $response)
{
	// Query sessions table against recieved session ID, store in $currentSession as row object
	$rawData = $this->request->getBody();
	$sessionData = json_decode($rawData, TRUE);

	if(checkSession($this, $sessionData['session_id']) === 'r')
	{
		// Query RestAccounts based on the current restaurant
		$restQuery = $this->db->prepare("SELECT rest_id FROM RestAccount, Sessions WHERE RestAccount.rest_id = Sessions.account_id AND session_id=:sid");
		$restQuery->bindParam("sid", $sessionData['session_id']);
		$restQuery->execute();
		$restInfo = $restQuery->fetchObject();	

		foreach($sessionData['dishes'] as $thisDish)
		{
			$addDishQuery = $this->db->prepare("INSERT INTO Dishes (rest_id, name, description) VALUES (:rid, :name, :description)");
			$addDishQuery->bindParam("rid", $restInfo->rest_id);
			$addDishQuery->bindParam("name", $thisDish['name']);
			$addDishQuery->bindParam("description", $thisDish['description']);	
			$addDishQuery->execute();
		}

		$this->response = $this->response->withStatus(201);
		return $this->response;
	}
	
	$this->response = $this->response->withStatus(403);
	return $this->response;
});

$app->delete('/restaurant/deleteDishes', function($request, $response)
{
	// Query sessions table against recieved session ID, store in $currentSession as row object
	$rawData = $this->request->getBody();
	$sessionData = json_decode($rawData, True);

	if(checkSession($this, $sessionData['session_id']) === 'r')
	{
		// Query RestAccounts based on the current restaurant
		$restQuery = $this->db->prepare("SELECT rest_id FROM RestAccount, Sessions WHERE RestAccount.rest_id = Sessions.account_id AND session_id=:sid");
		$restQuery->bindParam("sid", $sessionData['session_id']);
		$restQuery->execute();
		$restInfo = $restQuery->fetchObject();	

		foreach($sessionData['dishes'] as $thisDish)
		{
			$removeDishQuery = $this->db->prepare("DELETE FROM Dishes WHERE dish_id=:did AND rest_id=:rid");
			$removeDishQuery->bindParam("did", $thisDish['id']);
			$removeDishQuery->bindParam("rid", $restInfo->rest_id);
			$removeDishQuery->execute();
		}

		$this->response = $this->response->withStatus(200);
		return $this->response;
	}

	$this->response = $this->response->withStatus(403);
	return $this->response;
});

$app->post('/createRestAccount', function($request, $response){
        $input = $request->getParsedBody();
        foreach($input as $key => $param){
                if($key == "name"){
                        $name = $param;
                }
                if($key == "email"){
                        $email = $param;
                }
                if($key == "password"){
                        $password = $param;
                }
                if($key == "address"){
                        $address = $param;
                }
                if($key == "category"){
                        $category = $param;
                }
                if($key == "city"){
                        $city = $param;
                }
                if($key == "state_post_code"){
                        $state_post_code = $param;
                }
	}
        $sth = $this->db->prepare("SELECT * FROM RestAccount");
        $sth->execute();
        $output = $sth->fetchAll();
        foreach ($output as $o){
                if($o['name'] == $name OR $o['email'] == $email){
                        $data = json_decode($json, true);
                        $data[] = array('valid' => 'false', 'session_id' => 0);
                        $json = json_encode($data);
                        return $json;
                }
        }
	$name = str_replace("'", "", $name);
        $sql = "INSERT INTO RestAccount (name, email, password, address, category, city, state_post_code) VALUES ('$name','$email','$password', '$address', 		'$category', '$city','$state_post_code')";
        $stm = $this->db->prepare($sql);
        if($stm->execute()){
                $stm = $this->db->prepare("SELECT rest_id FROM RestAccount WHERE name=:name");
                $stm->bindParam("name", $name);
                $stm->execute();
                $output= $stm->fetchAll();
                $val = $output[0][rest_id];
                $sid = uniqid();
                $data = json_decode($json, true);
                $data[] = array('valid' => 'true', 'session_id' => $sid);
                $json = json_encode($data);
                $sql = "INSERT INTO Sessions (account_id, is_restaurant, session_id, time_created, time_expires) VALUES ($val, 1, '$sid', now(), now() + interval 1 hour)";
		$stm2 = $this->db->prepare($sql);
                $stm2->execute();
                return $json;
        }

});

//Rest profile: display profile
$app->get('/restprofile/[{rest_id}]', function($request, $response, $args){
    //get rest information
    $info = $this->db->prepare("SELECT name, email, address, category, city, state_post_code
                  FROM RestAccount
                  WHERE rest_id = :rest_id");
    $info->bindParam("rest_id", $args['rest_id']);
    $info->execute();
    $data = $info->fetchAll();
    //get favorite Dishes
    $sth = $this->db->prepare("SELECT name, description, score FROM Dishes WHERE rest_id =:rest_id");
    $sth->bindParam("rest_id", $args['rest_id']);
    $sth->execute();
    $list = $sth->fetchAll();
    $dish = array('Dishes' => $list);
    //combine both together
    $total = array_merge($data, $dish);
    return $this->response->withJson($total);
});

//up vote (down vote) a dish or add a dish to favorite list
$app->post('/restProfile/public', function($request, $response, $args){
    $body = $request->getBody();
    $body = json_decode($body, true);
    $dish_id = $body['dish_id'];
    $vote = $body['vote'];
    $id = $body['session_id'];
    //get session_id
    $info = $this->db->prepare("SELECT account_id, session_id, time_expires FROM Sessions WHERE session_id='$id'");
    $info->execute();
    $data = $info->fetchAll();
    //if session_id exists
    if(!empty($data)) {
        //if session_id exist but already expires
        $today = date('Y-m-d H:i:s');
        if ($data[0][time_expires] < $today) {
            $session_expire = $this->db->prepare("DELETE FROM Sessions WHERE session_id = :id");
            $session_expire->bindParam("id", $id);
            $session_expire->execute();
            $mess[] = array('valid' => 'false', 'session_id' => 0);
            return json_encode($mess);
        //if session exists and not expires, but isRestaurant (can't vote or add favorite dish)
        } else if ($data[0][is_restaurant] == 1) {
            $mess[] = array('valid' => 'false', 'session_id' => $id);
            return json_encode($mess);
        //if session exists and not expires and not restaurant account
        } else {
            //get user_id
            $user_id = $data[0][account_id];
            ///////////if vote is empty -> adding dish
            if (empty($vote)) {
                return addDish($this->db, $dish_id, $user_id, $id);
            ///////////if vote is not empty -> changing vote
            } else {
                return updateVote($this->db, $dish_id, $user_id, $id, $vote);
            }
        }
    //session_id no longer exist
    } else {
        $data[] = array('valid' => 'false', 'session_id' => 0);
        return json_encode($data);
    }
});

function addDish($db, $dish_id, $user_id, $id){
      if (empty($vote)) {
        $query = $db->prepare("SELECT * FROM Favorites WHERE dish_id='$dish_id'
                    AND user_id='$user_id'");
        $query->execute();
        $data = $query->fetchObject();
        //if dish is already in favorite list for this user
        if(!empty($data)){
            $mess[] = array('success' => 'false', 'session_id' => $id);
            return json_encode($mess);
            //dish not exist , CREATE new favorite
        } else {
            $new = $db->prepare("INSERT INTO Favorites(user_id, dish_id) VALUES('$user_id','$dish_id')");
            $new->execute();
            $mess[] = array('success' => 'true', 'session_id' => $id);
            return json_encode($mess);
        }
    }
}

function updateVote($db, $dish_id, $user_id, $id, $vote){
      $query = $db->prepare("SELECT * FROM Vote WHERE dish_id='$dish_id'
                  AND user_id='$user_id'");
      $query->execute();
      $data = $query->fetchObject();
      //vote associated with this user already exist
      if (!empty($data)) {
          //if your vote choice is different the vote data in the table, neutral the vote
          //and delete from the table
          if ($vote != $data->vote) {
              //delete vote from Vote table
              $q = $db->prepare("DELETE FROM Vote WHERE user_id='$user_id' AND dish_id = '$dish_id'");
              $q->execute();
              //update vote for the dish in Dishes table
              $q2 = $db->prepare("UPDATE Dishes SET score = score + '$vote' WHERE dish_id = '$dish_id'");
              $q2->execute();
              $mess[] = array('success' => 'true', 'session_id' => $id);
              return json_encode($mess);
          //if your vote is the same
          } else {
              $mess[] = array('success' => 'false', 'session_id' => $id);
              return json_encode($mess);
          }
      //vote not exist for this user , CREATE new vote data
      } else {
          $new = $db->prepare("INSERT INTO Vote(user_id, dish_id, vote) VALUES('$user_id','$dish_id','$vote')");
          $new->execute();
          $q2 = $db->prepare("UPDATE Dishes SET score = score + '$vote' WHERE dish_id = '$dish_id'");
          $q2->execute();
          $mess[] = array('success' => 'true', 'session_id' => $id);
          return json_encode($mess);
      }
}
