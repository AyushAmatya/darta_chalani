<?php
    if ($this->session->flashdata('error_msg')) { ?>
        <p class="status-msg error-message" style="color: red;"><?php echo $this->session->flashdata('error_msg'); ?></p>
   <?php } else { ?>
        <p class="status-msg error-message" style="color: red;"><?php echo $this->session->flashdata('msg'); ?></p>
   <?php }
?>