echo 'start deploy website to ispeech ftp server'

sftp speech@www.i-speech.net

put app/index.php www/speech/index.php

echo 'success'

