<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // =========================
    // FORM DATA
    // =========================
    $name    = $_POST['name'] ?? '';
    $email   = $_POST['email'] ?? '';
    $phone   = $_POST['phone'] ?? '';
    $state   = $_POST['state'] ?? '';
    $town    = $_POST['town'] ?? '';
    $cp      = $_POST['cp'] ?? '';
    $message = $_POST['message'] ?? '';

    $mail = new PHPMailer(true);

    try {

        // =========================
        // CSV
        // =========================

        $lead = [
            date('Y-m-d H:i:s'),
            $name,
            $email,
            $phone,
            $state,
            $town,
            $cp,
            $message
        ];

        $dir = __DIR__ . "/../leads";
        $file = $dir . "/leads.csv";

        // Crear carpeta si no existe
        if (!is_dir($dir)) {
            mkdir($dir, 0777, true);
        }

        // Abrir archivo
        $f = fopen($file, 'a');

        if (!$f) {
            throw new Exception("No se pudo abrir el CSV");
        }

        // Escribir fila
        fputcsv($f, $lead);

        // Cerrar archivo
        fclose($f);

        // =========================
        // SMTP CONFIG
        // =========================

        $mail->SMTPDebug = 0;

        $mail->isSMTP();
        $mail->Host = 'mailserver.businessidentity.llc';
        $mail->SMTPAuth = true;

        $mail->Username = 'admin@starlinkinstallationsllc.com';
        $mail->Password = 'Avalon101$';

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;

        $mail->Timeout = 15;
        $mail->SMTPKeepAlive = false;

        $mail->SMTPOptions = [
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            ]
        ];

        // =========================
        // EMAIL
        // =========================

        // AUTH + FROM
        $mail->setFrom(
            'admin@starlinkinstallationsllc.com',
            'Starlink Installations LLC'
        );

        // DESTINO REAL
        $mail->addAddress('sales@starlinkinstallationsllc.com');

        // Reply del cliente
        $mail->addReplyTo($email, $name);

        // Adjuntar CSV
        $mail->addAttachment($file, 'leads.csv');

        $mail->isHTML(true);

        $mail->Subject = 'New Lead';

        $mail->Body = "
            <h2>New Lead Received</h2>

            <p><b>Name:</b> {$name}</p>
            <p><b>Email:</b> {$email}</p>
            <p><b>Phone:</b> {$phone}</p>
            <p><b>State:</b> {$state}</p>
            <p><b>Town:</b> {$town}</p>
            <p><b>CP:</b> {$cp}</p>

            <p><b>Message:</b><br>{$message}</p>
        ";

        // =========================
        // SEND
        // =========================

        $mail->send();

        echo json_encode([
            "status" => "success",
            "message" => "Request sent"
        ]);

    } catch (Exception $e) {

        http_response_code(500);

        echo json_encode([
            "status" => "error",
            "message" => $e->getMessage()
        ]);
    }
}