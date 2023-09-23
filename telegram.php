<?php
$server = "sql102.epizy.com";
$username = "epiz_30500676";
$password = "9WW0wrXoa8";

$dbname = "epiz_30500676_packetcodeofficial";
$name = $_POST['name'];
$number = $_POST['phone'];

$token = '6163349466:AAEoHcEmAn6SrKOYjNzROdrBgD4xBp3QxO0';
$chat_id = '-1001833880231';

$arr = array(
    'Ф.И.О: ' => $name,
    'Номер телефона: ' => $number,
    'Крем: ' => 'ferula',
);

$text = '';
foreach ($arr as $key => $value) {
    $text .= $key . $value . "%0A";
}

$telegramUrl = "https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$text}";

$curl = curl_init($telegramUrl);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($curl);
$error = curl_error($curl);

curl_close($curl);

if ($response !== false) {
    header('location: thanks.html');
} else {
    echo 'ERROR: ' . $error;
}
?>
