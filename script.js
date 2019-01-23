const SHOPPING_ITEMS = [];

// var myJsonString = JSON.stringify(yourArray);

//creating new item 
$('#newItem').on('keydown', function (e) {
  $newItem = $(this).val().trim();

  if (e.which == 13) {
    e.preventDefault();

    if ($newItem != '') {
      $('.shopping_list').append(`
    <div class="form-control">
    <input class="shopping_list_checker" type="checkbox" value="${$newItem}">
    <label class="shopping_list_name" for="${$newItem}">${$newItem}</label>
    <i class="fas fa-minus-circle mt-1 text-danger shopping_list_remove" style="float:right;display:none" value="${$newItem}"></i>
    </div>
    `);
      $(this).val('');

      SHOPPING_ITEMS.push($newItem);
      console.log(SHOPPING_ITEMS);
    }

  }



  // check the item
  $('.shopping_list ').on('click', 'input[type="checkbox"]', function () {
    if ($(this).is(':checked')) {
      $('label[for="' + $(this).val() + '"]').html(`<strike>${$(this).val()}</strike>`)
    } else {
      $('label[for="' + $(this).val() + '"]').html($(this).val())
    }
  })

  //change text to editable
  $('.shopping_list').on('click', 'label', function () {
    $('.form-control').removeClass('focused_item');
    $(this).closest('.form-control').addClass('focused_item');
    let val = $(this).attr('for');
    $(this).after(`
    <input autofocus class="shopping_list_input" type="text" value="${val}">
    `);
    $(this).remove();

    $('#item_title').html(val);
    $('.detail_content').show();
  })

  //editing item 
  $('.shopping_list').on('keydown', 'input[type="text"]', function (e) {
    if (e.which == 13) {
      e.preventDefault();
      let val = $(this).val().trim();
      $(this).closest('div').children('.shopping_list_checker').val(val);
      $(this).closest('div').children('.shopping_list_remove').attr('value', val);
      $(this).after(`
        <label class="shopping_list_name" for="${val}">${val}</label>
        `);
      $(this).remove();
      $('#item_title').html(val);

    }
  })

  // show and hide icon for remove
  $('.shopping_list').on('mouseover', 'div', function (e) {
    $(this).children('i').show();
  })

  $('.shopping_list').on('mouseleave', 'div', function (e) {
    $(this).children('i').hide();
  })

  // remove Item
  $('.shopping_list_remove').on('click', function (e) {
    if ($('#item_title').html() == $(this).attr('value')) {
      $('#item_title').html('NO');
      $('.detail_content').hide();
    }

    SHOPPING_ITEMS.splice($(this).attr('value'));

    console.log(SHOPPING_ITEMS, $(this).attr('value'));
    $(this).closest('div').remove();

  })

})