
<div>
    <?php
      $this->load->view('templates/alerts');
    ?>
</div>
<div class="row">
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col-md-8">
                        <?php echo $this->lang->line('available_menu') ?> <?php echo $urlBootstrap ?>
                    </div>
                    <div class="col-md-4 text-right">
                        <button type="button" data-toggle="modal" data-target=".bd-example-modal-lg" class="btn btn-secondary"><?php echo $this->lang->line('add_new_menu') ?><i class="fa fa-plus"></i></button>
                    </div>
                </div>
            </div>
            <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">

                    <div class="modal-content">
                        <form method="POST" action="<?php echo site_url("menucontroller/add"); ?>">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel"><?php echo $this->lang->line('new_entry') ?></h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="menu-code" class="col-form-label"><?php echo $this->lang->line('menu_code') ?>*</label>
                                    <input type="text" class="form-control" maxlength="15" name="menu_code" required>
                                </div>
                                <div class="form-group">
                                    <label for="menu-name" class="col-form-label"><?php echo $this->lang->line('menu_name') ?>*</label>
                                    <input type="text" class="form-control" name="menu_name" required>
                                </div>
                                <div class="form-group">
                                    <label for="route" class="col-form-label"><?php echo $this->lang->line('controller') ?>*</label>
                                    <input type="text" class="form-control" name="route" required>
                                </div>
                                <div class="form-group">
                                    <label for="action" class="col-form-label"><?php echo $this->lang->line('action') ?>*</label>
                                    <input type="text" class="form-control" name="action" required>
                                </div>
                                <div class="form-group">
                                    <label for="menu_index" class="col-form-label"><?php echo $this->lang->line('menu_index') ?>*</label>
                                    <input type="number" class="form-control" name="menu_index" required>
                                </div>
                                <div class="form-group">
                                    <label for="icon_class" class="col-form-label"><?php echo $this->lang->line('icon_class') ?>*</label>
                                    <input type="text" class="form-control" name="icon_class" required>
                                    <input type="hidden" class="form-control" name="parent_menu" value= "0">
                                </div>
                                <div class="form-group">
                                    <label for="description" class="col-form-label"><?php echo $this->lang->line('description') ?></label>
                                    <input type="text" class="form-control" name="description" >
                                </div>
                                <div class="form-group">
                                    <label for="visible" class="col-form-label"><?php echo $this->lang->line('visible') ?></label> <br>
                                        <input type="radio" id="visible" name="visible" value="Y" checked> Yes
                                        <input type="radio" id="Invisible" name="visible" value="N"> No
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal" aria-label="Close"> Close</button>
                                <input type="submit" class="btn btn-secondary" name="addMenu" value="Add">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div id="tree-container">

                </div>

            </div>
        </div>
    </div>
    <input type="hidden" id="baseurl" value="<?php echo base_url() ?>">
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
            <div class="container">
                
                <ul class="nav nav-tabs">
                    <li class="nav-item active">
                        <a data-toggle="tab" class = "nav-link active" aria-current="page" href="#updateMenuTab">Update Menu</a>
                    </li>
                    <li class="nav-item" id="assign-values">
                        
                    </li>
                    <li class="nav-item" id = "add-child">
                        
                    </li>
                </ul>

                <div class="tab-content">
                    <div id="updateMenuTab" class="tab-pane fade in active show">
                        
                    </div>
                    <div id="menu1" class="tab-pane fade">
                        <?php
                            foreach($roles as $role){ ?>
                                <?php echo $role['ROLE_NAME'] ?>
                                <div class="text-right">
                                    <input type="checkbox" data-id = "<?php echo $role['ROLE_ID'] ?>" class="checkbox" id="<?php echo "checkboxPerm".$role['ROLE_ID'] ?>">
                                </div>
                                <hr>
                        <?php }
                        ?>
                    </div>
                    <div id="menu2" class="tab-pane fade">
                      
                    </div>

                </div>
            </div>

            </div>
        </div>
    </div>
</div>

<script>
    $(document).ready(function() {
        $('#tree-container').jstree({
            'plugins': ["wholerow"],
            'core': {
                'data': {

                    "url": "<?php echo base_url(); ?>index.php/MenuController/get_data",
                    "plugins": ["wholerow"],
                    "dataType": "json"
                }
            },
        });

        $(document).on('click', '#tree-container ul li a', function(e) {
            var menu_id = $(this).closest("li").attr('id');
            var baseurl = $('#baseurl').val();
            $.ajax({
                type: "POST",
                url: baseurl + "index.php/menucontroller/editMenu/",
                data: {menu_id},
                success: function (success) {
                    // console.log(success);
                     success = JSON.parse(success);
                    //  console.log(success.menuRolePer);
                    $('#updateMenuTab').empty();
                    $('#updateMenuTab').append(`
                        <form method="POST" action="<?php echo site_url("menucontroller/updateMenu"); ?>">
                        <div class="form-group">
                            <label for="menu-code" class="col-form-label">Menu Code*</label>
                            <input type="text" class="form-control" id="menuCode" maxlength="15" value = `+success.detail.MENU_CODE+` name="menu_code" required>
                        </div>
                        <div class="form-group">
                            <label for="menu-name" class="col-form-label">Menu Name*</label>
                            <input type="text" class="form-control" id="menuName" value = `+success.detail.MENU_NAME+` name="menu_name" required>
                        </div>
                        <div class="form-group">
                            <label for="route" class="col-form-label">Controller*</label>
                            <input type="text" class="form-control" id="route" value = `+success.detail.ROUTE+` name="route" required>
                        </div>
                        <div class="form-group">
                            <label for="action" class="col-form-label">Action*</label>
                            <input type="text" class="form-control" id="action" value = `+success.detail.ACTION+` name="action" required>
                        </div>
                        <div class="form-group">
                            <label for="menu_index" class="col-form-label">Menu Index*</label>
                            <input type="number" class="form-control" id="menuindex" value = `+success.detail.MENU_INDEX+` name="menu_index" required>
                        </div>
                        <div class="form-group">
                            <label for="icon_class" class="col-form-label">Icon Class*</label>
                            <input type="text" class="form-control" id="iconclass" value = `+success.detail.ICON_CLASS+` name="icon_class" required>
                        </div>
                        <div class="form-group">
                            <label for="description" class="col-form-label">Description</label>
                            <input type="text" class="form-control" id="description" value = `+success.detail.MENU_DESCRIPTION+` name="description" >
                            <input type="hidden" value = `+success.detail.MENU_ID+` id="attachedMenuIdCheckbox" name="menu_id" >                            
                        </div>
                        <div class="form-group">
                            <label for="visible" class="col-form-label">Visible</label> <br>
                                <input type="radio" id="visible" name="visible" value="Y" checked> Yes
                                <input type="radio" id="Invisible" name="visible" value="N"> No
                        </div>
                        <div class="row">
                            <div class="col-6">
                            <input type="submit" class="btn btn-danger" name="deleteMenu" value="Delete">
                            </div>
                            <div class="col-6 text-right">
                                <input type="submit" class="btn btn-secondary" name="updateMenu" value="Update">
                            </div>
                        </div>
                        </form>
                    `);
                    $('#assign-values').empty();
                    $('#assign-values').append(`<a data-toggle="tab" class = "nav-link" aria-current="page"  href="#menu1">Assign Menus</a>`);
                    $('input:checkbox').prop('checked',false);
                    if (success.menuRolePer != false) {
                        $.each(success.menuRolePer, function(key, value) {
                            $('#checkboxPerm'+value.ROLE_ID).prop('checked', true);
                        });
                    } 
                    $('#add-child').empty();
                    $('#add-child').append(`<a data-toggle="tab" class = "nav-link" aria-current="page"  href="#menu2">Add Child Menu</a>`);
                    $('#menu2').empty();
                    $('#menu2').append(`
                            <form method="POST" action="<?php echo site_url("menucontroller/add"); ?>">
                                <div class="form-group">
                                    <label for="menu-code" class="col-form-label">Menu Code *</label>
                                    <input type="text" class="form-control" maxlength="15" name="menu_code" required>
                                </div>
                                <div class="form-group">
                                    <label for="menu-name" class="col-form-label">Menu Name*</label>
                                    <input type="text" class="form-control" name="menu_name" required>
                                </div>
                                <div class="form-group">
                                    <label for="route" class="col-form-label">Controller *</label>
                                    <input type="text" class="form-control" name="route" required>
                                </div>
                                <div class="form-group">
                                    <label for="action" class="col-form-label">Action *</label>
                                    <input type="text" class="form-control" name="action" required>
                                </div>
                                <div class="form-group">
                                    <label for="menu_index" class="col-form-label">Menu Index*</label>
                                    <input type="number" class="form-control" name="menu_index" required>
                                </div>
                                <div class="form-group">
                                    <label for="icon_class" class="col-form-label">Icon Class*</label>
                                    <input type="text" class="form-control" name="icon_class" required>
                                    <input type="hidden" class="form-control" name="parent_menu" value= "`+success.detail.MENU_ID+`">
                                </div>
                                <div class="form-group">
                                    <label for="description" class="col-form-label">Descritpion</label>
                                    <input type="text" class="form-control" name="description" >
                                </div>
                                <div class="form-group">
                                    <label for="visible" class="col-form-label">Visible</label> <br>
                                        <input type="radio" id="visible" name="visible" value="Y" checked> Yes
                                        <input type="radio" id="Invisible" name="visible" value="N"> No
                                </div>
                                <div class= "text-right">
                                <input type="submit" class="btn btn-secondary" name="addMenu" value="Add Child">
                                </div>
                            </div>
                    `);
                }
            });
        });
        $(document).on('click', '#menu1 .checkbox', function(e) {
            var menu_id = $('#attachedMenuIdCheckbox').val();
            var role_id = $(this).attr("data-id");
            var checked = $(this).is(':checked');
            var baseurl = $('#baseurl').val();
            console.log(menu_id);
            console.log(role_id);
            console.log(checked);
            $.ajax({
                type: "POST",
                url: baseurl + "index.php/menucontroller/assignMenu/",
                data: {menu_id,role_id,checked},
                success: function (success) {
                    
                }
            });
        });
    });

</script>