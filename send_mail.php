<?php
switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case ("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");

        $email = $_POST['email'];

        $message = "Hello,\n
        \nFollow this link to reset your Join password for your " . $email . " account.\n
        \nhttps://join.fabian-wirth.net/reset.password.html?email=" . $email . "\n";

        $recipient = $email;
        $subject = "Reset your password for Join App";
        $headers = "From:  noreply@http://join.fabian-wirth.net";

        $result = mail($recipient, $subject, $message, $headers);
        print($result);

        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}
?>