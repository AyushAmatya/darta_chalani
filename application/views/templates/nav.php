<nav class="navbar navbar-light bg-light p-3">
    <div class="d-flex col-12 col-md-3 col-lg-2 mb-2 mb-lg-0 flex-wrap flex-md-nowrap justify-content-between">
        <a class="navbar-brand" href="#">
            <img src="<?= base_url(); ?>assets/images/logo/laxmilogo.jpg" alt="tab1" class="img img-responsive">
        </a>
        <!-- <button class="navbar-toggler d-md-none collapsed mb-3" type="button" data-toggle="collapse" data-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span> 
        </button> -->

        <!-- <span class="navbar-toggler-icon"></span>  -->
    </div>
    <div class="col-12 col-md-5 col-lg-8 d-flex align-items-center justify-content-md-end mt-3 mt-md-0">
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
            Select Language
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><a class="dropdown-item" href="<?php echo site_url("welcome/switchLang/english"); ?>">English</a></li>
            <li><a class="dropdown-item" href="<?php echo site_url("welcome/switchLang/nepali"); ?>">Nepali</a> </li>
          </ul>
        </div>
        &nbsp;
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
            Hello, <?php echo $this->session->userdata('name') ?>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><a class="dropdown-item" href="#">View Profile</a></li>
            <li><a class="dropdown-item" href="<?php echo site_url("welcome/logout"); ?>">Sign out</a></li>
          </ul>
        </div>
    </div>
</nav>