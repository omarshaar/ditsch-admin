<?php

$req = $_GET['req'];
if (isset($req)) {$req();}

function allArticle(){
    include 'DB.php';
    // SQL Anweisungen
    $getData = $databaseCON->prepare(" SELECT * FROM `warenData` ORDER BY `warenData`.`id` ASC;");
    // Run the SQL Code
    $getData->execute();
    // Fetch Data
    $rows = $getData->fetchAll(PDO::FETCH_ASSOC);

    $jsonData = json_encode($rows);
    print_r($jsonData);
}

function getThisMonthUmsatz(){
    $date = date('y-m-d');
    $dateStart = date('y-m');
    $monthEnd = date("Y-m-t", strtotime($date));

    include 'DB.php';
    // SQL Anweisungen
    $getData = $databaseCON->prepare(" SELECT SUM(`totalUmsatz`) AS 'sum' FROM `verkauf` WHERE `date` BETWEEN '$dateStart-01' AND '$monthEnd'; ");
    // Run the SQL Code
    $getData->execute();
    // Fetch Data
    $rows = $getData->fetch(PDO::FETCH_ASSOC);

    $jsonData = json_encode($rows);
    print_r($jsonData);
}

function getPrevMonthUmsatz(){
    $startDate = date("Y-n-j", strtotime("first day of previous month"));
    $endDate =  date("Y-n-j", strtotime("last day of previous month"));


    include 'DB.php';
    // SQL Anweisungen
    $getData = $databaseCON->prepare(" SELECT SUM(`totalUmsatz`) AS 'sum' FROM `verkauf` WHERE `date` BETWEEN '$startDate' AND '$endDate'; ");
    // Run the SQL Code
    $getData->execute();
    // Fetch Data
    $rows = $getData->fetch(PDO::FETCH_ASSOC);

    $jsonData = json_encode($rows);
    print_r($jsonData);
}

function getLast6MonthUmsatzChart(){
    include 'DB.php';
    // SQL Anweisungen
    $getData = $databaseCON->prepare(" SELECT DATE_FORMAT(`date`, '%Y-%m') as month, SUM(`totalUmsatz`) as total_umsatz FROM `verkauf` WHERE  `date` >= DATE_SUB(NOW(), INTERVAL 6 MONTH) GROUP BY  month ORDER BY `date` DESC; ");
    // Run the SQL Code
    $getData->execute();
    // Fetch Data
    $rows = $getData->fetchAll(PDO::FETCH_ASSOC);

    $jsonData = json_encode($rows);
    print_r($jsonData);
}

function getLastTransactions(){
    $limit = $_GET['limit'];
    $data = [];

    function verkauf($limit){
        include 'DB.php';
        // SQL Anweisungen
        $getData = $databaseCON->prepare("SELECT * FROM `verkauf` ORDER BY `date` DESC LIMIT $limit;");
        // Run the SQL Code
        $getData->execute();
        // Fetch Data
        $rows = $getData->fetchAll(PDO::FETCH_ASSOC);
        return $rows;
    }
    
    function Bruch($limit){
        include 'DB.php';
        // SQL Anweisungen
        $getData = $databaseCON->prepare("SELECT * FROM `bruch` ORDER BY `date` DESC LIMIT $limit;");
        // Run the SQL Code
        $getData->execute();
        // Fetch Data
        $rows = $getData->fetchAll(PDO::FETCH_ASSOC);

        return $rows;
    }

    function liefer($limit){
        include 'DB.php';
        // SQL Anweisungen
        $getData = $databaseCON->prepare("SELECT * FROM `lieferscheine` ORDER BY `date` DESC LIMIT $limit;");
        // Run the SQL Code
        $getData->execute();
        // Fetch Data
        $rows = $getData->fetchAll(PDO::FETCH_ASSOC);
        return $rows;
    }

    $data["verkauf"] = verkauf($limit);
    $data["bruch"] = Bruch($limit);
    $data["liefer"] = liefer($limit);

    $jsonData = json_encode($data);
    print_r($jsonData);
}

function getCleanedList(){
    include 'DB.php';
    // SQL Anweisungen
    $getData = $databaseCON->prepare("SELECT a.*, b.`userName` FROM `cleanedList` AS a JOIN `accounts` AS b ON a.`targetUser` = b.`id`;");
    // Run the SQL Code
    $getData->execute();
    // Fetch Data
    $rows = $getData->fetchAll(PDO::FETCH_ASSOC);

    $jsonData = json_encode($rows);
    print_r($jsonData);
}

function getThekeList(){
    include 'DB.php';
    // SQL Anweisungen
    $getData = $databaseCON->prepare("SELECT a.*, b.`userName` FROM `ThekeList` AS a JOIN `accounts` AS b ON a.`targetUser` = b.`id`;");
    // Run the SQL Code
    $getData->execute();
    // Fetch Data
    $rows = $getData->fetchAll(PDO::FETCH_ASSOC);

    $jsonData = json_encode($rows);
    print_r($jsonData);
}

function getEmployees(){
    include 'DB.php';
    $verified = $_GET['verified'];
    // SQL Anweisungen
    $getData = $databaseCON->prepare("SELECT `id`,`userName`,`email`,`role`,`dailyHours`,`workStart`,`workEnd`,`euro_std`,`avatar`,`schicht`, `verified` FROM `accounts` WHERE `verified` = $verified");
    // Run the SQL Code
    $getData->execute();
    // Fetch Data
    $rows = $getData->fetchAll(PDO::FETCH_ASSOC);

    $jsonData = json_encode($rows);
    print_r($jsonData);
}

function getEmployeeAuszahlung(){
    include 'DB.php';
    $id = $_GET['id'];
    // SQL Anweisungen
    $getData = $databaseCON->prepare("SELECT MONTH(times.`Date`) AS month, YEAR(times.`Date`) AS year, SUM(times.`totalOfHours`) AS 'total', SUM(times.`overTime`) AS 'overTime', user.euro_std AS 'euro' FROM `workTimes` AS times, `accounts` AS user WHERE times.targetUserID = user.id AND `targetUserID` = $id group by MONTH(`Date`)+'-'+YEAR(`Date`);");
    // Run the SQL Code
    $getData->execute();
    // Fetch Data
    $rows = $getData->fetchAll(PDO::FETCH_ASSOC);

    $jsonData = json_encode($rows);
    print_r($jsonData);
}

function getEmployeesOverTimes(){
    include 'DB.php';

    // SQL Anweisungen
    $getData = $databaseCON->prepare("SELECT * FROM `overTimes`");
    // Run the SQL Code
    $getData->execute();
    // Fetch Data
    $rows = $getData->fetchAll(PDO::FETCH_ASSOC);

    $jsonData = json_encode($rows);
    print_r($jsonData);
}

function getKaffes(){
    include 'DB.php';

    // SQL Anweisungen
    $getData = $databaseCON->prepare("SELECT * FROM `kaffe` ORDER BY `sorter`");
    // Run the SQL Code
    $getData->execute();
    // Fetch Data
    $rows = $getData->fetchAll(PDO::FETCH_ASSOC);

    $jsonData = json_encode($rows);
    print_r($jsonData);
}

function getKaffeAllMonth(){
    include 'DB.php';
    $firstDayDate = $_GET['date'];
    $lastDayDate = date("Y-m-t", strtotime($firstDayDate));
    
    // SQL Anweisungen
    $getData = $databaseCON->prepare("SELECT a.*, b.`name`, b.size FROM `KaffeeMonthly` AS a, `kaffe` AS b WHERE a.`targetKaffeeItem` = b.`id` AND a.`date` BETWEEN '$firstDayDate-01' AND '$lastDayDate' GROUP BY b.`name`, b.`size`;");
    // Run the SQL Code
    $getData->execute();
    // Fetch Data
    $rows = $getData->fetchAll(PDO::FETCH_ASSOC);

    $jsonData = json_encode($rows);
    print_r($jsonData);
}

function getActivitys(){
    include 'DB.php';
    $id = $_GET['id'];
    $date = $_GET['date'];

    // SQL Anweisungen
    $getData = $databaseCON->prepare(" SELECT * FROM `activity` WHERE `targetUserID` = '$id' AND `date` = '$date'; ");
    // Run the SQL Code
    $getData->execute();
    // Fetch Data
    $rows = $getData->fetchAll(PDO::FETCH_ASSOC);

    $jsonData = json_encode($rows);
    print_r($jsonData);
}





