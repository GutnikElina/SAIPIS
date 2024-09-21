$(document).ready(function () {
  $("#changeStyleBtn").click(function () {
    $(".class3-change").nextAll().addClass("classNEW");
  });

  $("#fadeOutBtn").click(function () {
    $("[id^='id']:even").find("p").fadeOut("slow");
    $("[id^='id']:odd").find("h2").fadeOut("slow");
  });

  $("#refresh").click(function () {
    location.reload();
  });
});
