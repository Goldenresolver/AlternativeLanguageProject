$(() => {
  $(".phone-info").click((e) => {
    $(".selected").removeClass("selected");
    $(e.target).closest("tr.phone-info").addClass("selected");
  });

  $("#phone-delete").click((e) => {
    const id = $(".selected").attr("phone-id");
    $.ajax({
      url: "/delete",
      data: {
        id: id,
      },
      success: (res) => {
        console.log(res);
        location.reload();
      },
    });
  });
});
