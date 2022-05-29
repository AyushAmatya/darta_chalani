

	                  

<!-- </div> -->

	<div class="container">
		<div class="language" style="float: right;">
			<a href="<?php echo site_url("welcome/switchLang/english"); ?>">English</a> |
			<a href="<?php echo site_url("welcome/switchLang/nepali"); ?>">Nepali</a> 
			<br><br>
			<?php
			//  ?>  
		</div>
		<section class="login-sec">
					<div class="card-body" style="top: 200px;">
						<div class="row">
							<div class="col-lg-6 offset-lg-3 col-md-12 card" >
								<div class="left-form p-5">
									<div class="login-headings">
										<h3 class="text-center"><?php echo $this->lang->line('login'); ?></h3> <br>
										<p class="status-msg error-message" style="color: red;"><?php echo $this->session->flashdata('msg'); ?></p>
									</div>
									<form method="POST" >
										<div class="form-row align-items-center">
											<div class="col-auto">
											<label class="sr-only" for="inlineFormInputGroup" ><?php echo $this->lang->line('username'); ?></label>
											<div class="input-group mb-2">
												<div class="input-group-prepend">
												<div class="input-group-text">@</div>
												</div>
												<input type="text" class="form-control" id="inlineFormInputGroup" placeholder="<?php echo $this->lang->line('username'); ?>" name="username" required>
											</div>
											</div>
											<div class="col-auto">
												<label class="sr-only" for="inlineFormInputGroup"><?php echo $this->lang->line('password'); ?></label>
												<div class="input-group mb-2">
													<div class="input-group-prepend">
													<div class="input-group-text"><i class="fa fa-key" aria-hidden="true"></i></div>
													</div>
													<input type="password" class="form-control" id="inlineFormInputGroup" placeholder="<?php echo $this->lang->line('password'); ?>" name="password" required>
												</div>
												</div>
											</div>
											<div class="col-auto">
											<div class="form-check mb-2">
												<input class="form-check-input" type="checkbox" id="autoSizingCheck">
												<label class="form-check-label" for="autoSizingCheck">
												Remember me            
												</label>
											</div>
											</div> 
											<div class="col-auto">
												<div class="button-loin text-center">
												<input type="submit" class="btn btn-primary btn-noc" name="loginSubmit" value="LOGIN">
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>				
				</div>
		</section>
	</div>
	
<script href="<?=base_url();?>assets/js/bootstrap.min.js"></script>






