<?php

    mail('acastejon.pro@gmail.com', filter_input(INPUT_POST, "object"), "From : ".filter_input(INPUT_POST, "name")." <".filter_input(INPUT_POST,"email").">\n".filter_input(INPUT_POST,"message"));
    echo "OK";

?>
