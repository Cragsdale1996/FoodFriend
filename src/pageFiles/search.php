<?php

$app->post('/searchpage', function($request, $response){
        $input = $request->getParsedBody();
        foreach($input as $key => $param){
                if($key == "session_id"){
                        $sid = $param;
                }
        }
        $sth = $this->db->prepare("SELECT account_id, time_expires FROM Sessions WHERE session_id=:session_id");
        $sth->bindParam("session_id", $sid);
        $sth->execute();
        $output = $sth->fetchAll();
        if(empty($output)){
                $data = json_decode($json, true);
                $data[] = array('valid' => 'false', 'session_id' => '0');
                $json = json_encode($data);
                return $json;
        }
        date_default_timezone_set('US/Central');
        $today = date("Y-m-d H:i:s");
        if($output[0][time_expires] < $today){
                $stm = $this->db->prepare("DELETE FROM Sessions WHERE account_id=:account_id");
                $stm->bindParam("account_id", $output[0][account_id]);
                $stm->execute();
                $data = json_decode($json, true);
                $data[] = array('valid' => 'false', 'session_id' => '0');
                $json = json_encode($data);
                return $json;
        }
        $sth2 = $this->db->prepare("SELECT DISTINCT(category) FROM RestAccount");
        $sth2->execute();
        $output2 = $sth2->fetchAll();
        $data = json_decode($json, true);
        $data[] = array('valid' => 'true', 'session_id' => $sid);
        foreach($output2 as $o){
                $cat = $o[category];
                $data[] = array('category' => $cat);
        }
        $json = json_encode($data);
        return $json;
});

$app->get('/searchpage/[{search}]', function($request, $response, $args) {
        $searchstr = $args['search'];
        $words = explode(" ", $searchstr);
        $sql = array('0');
        foreach($words as $word){
                $word = str_replace("'", "", $word);
                $sql[] = "name LIKE '%".$word."%'";
        }
        $sql = "SELECT rest_id FROM RestAccount WHERE ".implode(" OR ", $sql);
        $sth = $this->db->prepare($sql);
        $sth->execute();
        $output = $sth->fetchAll();
        if(empty($output)){
                $data = json_decode($json, true);
                $data[] = array('rest_id' => '-1');
        }
        $data = json_decode($json, true);
        foreach($output as $o){
                $data[] = array('rest_id' => $o[rest_id]);
        }
        $json = json_encode($data);
        return $json;

});
