<?php

$_POST = json_decode(file_get_contents("php://input"),true);
date_default_timezone_set('Europe/Berlin');

$req = $_POST['req'];
if (isset($req)) {$req();}

function editEmployee(){
    include 'DB.php';
    $changed = $_POST['changed'];
    $targetUser = $_POST['targetUser'];

    $query = "UPDATE `accounts` SET ";
    foreach ($changed as $key=> $value) { $query .= "`$key`='$value', ";}
    $query =  rtrim($query, ", ");
    $query .= " WHERE `accounts`.`id` = $targetUser;";

    // SQL Anweisungen
    $getData = $databaseCON->prepare($query);
    // Run the SQL Code
    if ($getData->execute()) {
        print_r('successfully');
    }
}

function removeCleanedItem(){
    include 'DB.php';
    $id = $_POST['id'];

    // SQL Anweisungen
    $getData = $databaseCON->prepare("SELECT `imagePath` FROM `cleanedList` WHERE `id` = $id; ");
    // Run the SQL Code
    if ($getData->execute()) { 
        $rows = $getData->fetch(PDO::FETCH_ASSOC);
        $file = "../uploads/cleanImages/". basename($rows["imagePath"]);
        
        if (unlink($file)) {
           // SQL Anweisungen
            $getData = $databaseCON->prepare("DELETE FROM `cleanedList` WHERE `id` = $id; ");
            // Run the SQL Code
            if ($getData->execute()) { print_r('successfully'); }
        }
    }
}

function removeThekeItem(){
    include 'DB.php';
    $id = $_POST['id'];
    // SQL Anweisungen
    $getData = $databaseCON->prepare("SELECT `imagePath` FROM `ThekeList` WHERE `id` = $id; ");
    // Run the SQL Code
    if ($getData->execute()) { 
        $rows = $getData->fetch(PDO::FETCH_ASSOC);
        $file = "../uploads/thekeImages/". basename($rows["imagePath"]);
        
        if (unlink($file)) {
           // SQL Anweisungen
            $getData = $databaseCON->prepare("DELETE FROM `ThekeList` WHERE `id` = $id;");
            // Run the SQL Code
            if ($getData->execute()) { print_r('successfully'); }
        }
    }
}

function UpdateTransActionItems (){
    $cate = $_POST['cate'];
    $id = $_POST['id'];
    $obj = $_POST['obj'];

    $queryBruch = " UPDATE `bruch` SET `artikelsObj` = '$obj' WHERE `id` = '$id';";
    $queryLiefer = " UPDATE `lieferscheine` SET `artikelsObj` = '$obj' WHERE `id` = '$id';";
    $queryVerkauf = " UPDATE `verkauf` SET `artikelsObj` = '$obj' WHERE `id` = '$id';";

    function handleBruchAndVerkauf($query){
        include 'DB.php';

        $amount = $_POST['amount'];
        $number = $_POST['number'];

        $getData = $databaseCON->prepare("UPDATE `warenData` SET `sum` = `sum` + $amount WHERE `warenData`.`number` = $number;");
        if ($getData->execute()) { 
            $run = $databaseCON->prepare($query);
            if ($run->execute()) {
                print_r('successfully'); 
            }
        }
    }

    function handleLiefer($query){
        include 'DB.php';

        $amount = $_POST['amount'];
        $number = $_POST['number'];

        $getData = $databaseCON->prepare("UPDATE `warenData` SET `sum` = `sum` - $amount WHERE `warenData`.`number` = $number;");
        if ($getData->execute()) { 
            $run = $databaseCON->prepare($query);
            if ($run->execute()) {
                print_r('successfully'); 
            }
        }
    }

    switch ($cate) {
        case 'bruch':
            handleBruchAndVerkauf($queryBruch);
            break;
        case 'liefer':
            handleLiefer($queryLiefer);
            break;
        case 'verkauf':
            handleBruchAndVerkauf($queryVerkauf);
            break;
        default:
            print_r(false);
        break;
    }
}

function deleteTransactoinRow (){
    $id = $_POST['id'];
    $cate = $_POST['cate'];

    $articels = $_POST['articels'];
    $length = $_POST['length'];

    $queryBruch = "DELETE FROM `bruch` WHERE `id` = '$id'";
    $queryLiefer = "DELETE FROM `lieferscheine` WHERE `id` = '$id'";
    $queryVerkauf = "DELETE FROM `verkauf` WHERE `id` = '$id'";

    function handleLiefer2($query, $articels, $length){
        include 'DB.php';
        $a = json_decode($articels);
        $do = false;

        if ($length != 0) {

            for ($i=0; $i < number_format($length); $i++) {
                $amount = $a[$i]->amount;
                $number = $a[$i]->number;
    
                $getData = $databaseCON->prepare("UPDATE `warenData` SET `sum` = `sum` - $amount WHERE `number` = $number;");
                if ($getData->execute()) { $do = true; }
            }
    
            if ($do) {
                $run = $databaseCON->prepare($query);
                if ($run->execute()) {
                    print_r('successfully'); 
                }else{
                    print_r("error");
                }
            }

        }else{

            $run = $databaseCON->prepare($query);
            if ($run->execute()) {
                print_r('successfully'); 
            }else{
                print_r("error");
            }

        }

    }

    function handleBruchAndVerkauf2($query, $articels, $length){
        include 'DB.php';
        $a = json_decode($articels);
        $do = false;

        if ($length != 0) {
            for ($i=0; $i < number_format($length); $i++) {
                $amount = $a[$i]->amount;
                $number = $a[$i]->number;
    
                $getData = $databaseCON->prepare("UPDATE `warenData` SET `sum` = `sum` + $amount WHERE `number` = $number;");
                if ($getData->execute()) { $do = true; }
            }
    
            if ($do) {
                $run = $databaseCON->prepare($query);
                if ($run->execute()) {
                    print_r('successfully'); 
                }else{
                    print_r("error");
                }
            }
        }else{
            $run = $databaseCON->prepare($query);
            if ($run->execute()) {
                print_r('successfully'); 
            }else{
                print_r("error");
            }
        }

        
    }

    switch ($cate) {
        case 'bruch':
            handleBruchAndVerkauf2($queryBruch, $articels, $length);
            break;
        case 'liefer':
            handleLiefer2($queryLiefer, $articels, $length);
            break;
        case 'verkauf':
            handleBruchAndVerkauf2($queryVerkauf, $articels, $length);
            break;
        default:
            print_r(false);
        break;
    }
}

function acceptUser(){
    include 'DB.php';
    $id = $_POST['id'];
    // SQL Anweisungen
    $getData = $databaseCON->prepare("UPDATE `accounts` SET `verified` = '1' WHERE `accounts`.`id` = $id;");
    // Run the SQL Code
    if ($getData->execute()) {
        print_r('successfully');
    };
}

function deletetUser(){
    include 'DB.php';
    $id = $_POST['id'];
    // SQL Anweisungen
    $getData = $databaseCON->prepare("DELETE FROM `accounts` WHERE `accounts`.`id` = $id");
    // Run the SQL Code
    if ($getData->execute()) {
        print_r('successfully');
    };
}

function acceptOverTime(){
    include 'DB.php';
    $workTimesID = $_POST["workTimesID"];
    $overTimesID = $_POST["overTimesID"];
    $overTime = $_POST["overTime"];

    $sql = "UPDATE `workTimes` SET `overTime` = '$overTime', `overTimeAccepted` = 1 WHERE `workTimes`.`id` = $workTimesID;";
    $run = $databaseCON->prepare($sql);

    if ($run->execute()) {
        $run2 = $databaseCON->prepare("DELETE FROM `overTimes` WHERE `overTimes`.`id` = $overTimesID");
        if ($run2->execute()) {
            print_r("successfully");
        }
    }
}

function removeOverTime(){
    include 'DB.php';
    $overTimesID = $_POST["overTimesID"];

    $sql = "DELETE FROM `overTimes` WHERE `overTimes`.`id` = $overTimesID";
    $run = $databaseCON->prepare($sql);
    if ($run->execute()) {
        print_r("successfully");
    }
}

function updateKaffeSum(){
    include 'DB.php';
    $id = $_POST["id"]; 
    $sum = $_POST["sum"]; 

    $sql = "UPDATE `kaffe` SET `amount` = '$sum' WHERE `id` = '$id' ;";
    $run = $databaseCON->prepare($sql);
    if ($run->execute()) {

        $verkauft = $_POST["verkauft"];
        $targetKaffeeItem = $id;
        $author = $_POST["author"];
        $date = date('y-m-d');
        $FirstDaydate = date('Y-m');
        $lastDayDate = date("Y-m-t", strtotime($FirstDaydate));

        $getRowByDate_query = "SELECT * FROM `KaffeeMonthly` WHERE `date` BETWEEN '$FirstDaydate' AND '$lastDayDate' AND `targetKaffeeItem` = $targetKaffeeItem; ";
        $insert_query = "INSERT INTO `KaffeeMonthly` (`verkauft`, `date`, `author`, `targetKaffeeItem`) VALUES ('$verkauft', '$date', '$author', '$targetKaffeeItem');";

        $getData = $databaseCON->prepare("$getRowByDate_query");
        $getData->execute();
        $rows = $getData->fetch(PDO::FETCH_ASSOC);

        if ($getData->rowCount() > 0) {
            $RowID = $rows["id"];
            $update_query = "UPDATE `KaffeeMonthly` SET `verkauft` = `verkauft` + '$verkauft', `date` = '$date', `author` = '$author' WHERE `id` = $RowID;";
            $update = $databaseCON->prepare($update_query);
            if ($update->execute()){ print_r("successfully"); }
        }else{
            $insert = $databaseCON->prepare($insert_query);
            if ($insert->execute()){ print_r("successfully"); }
        }
    }
}

//_/|/*/|/-/|/*/|/_/|/*/|/-/|/*/|/_/|/*/|/-/|/*/|/_/|/*/|/-/|/*/|/_/|/*/|/-/|/*/|/_/|/*/|/-/|/*/|/_/|/*/|/-/|/*/|/_/|/*/|-|*|_|*|-|*|_|*|-|*|_|*|-|*|_|*|-|*|_|*|-|*|_|*|-|*|_|*|-|*|_|*|-|*|_|*|-|*|_|*|-|*|_|*|-|*|_|*|-|*|_|*|-|*|_|*|-|*|_|*|-|*|_|*|-|*|_|*|-|*|_|*|-|*|_|*|-|*|_|*|-|*|_|*|-|*|_|*|-|*|_//

function handleAdminLogIn(){
    include 'DB.php';
    $userName = $_POST["userName"]; 
    $pass = $_POST["pass"];
    $run = $databaseCON->prepare(" SELECT * FROM `adminLogin`WHERE `userName` = '$userName' AND `pass` = '$pass' ");
    $run->execute();
    if ($run->rowCount() > 0) { print_r(json_encode([ "admin" => "true"])); }
    else { print_r(json_encode([ "admin" => "false"])); }
}
