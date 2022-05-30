<div class="row">
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col-md-8">
                        Available Menus
                    </div>
                    <div class="col-md-4 text-right">
                        <button type="button" class="btn btn-secondary">Add New Menu <i class="fa fa-plus"></i></button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div id="tree-container">

                </div>

            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                Assign Menu
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
            console.log($(this).closest("li").attr('id'));
        });
    });
</script>