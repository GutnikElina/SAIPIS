$(document).ready(function () {
  $("#loadXML").click(function () {
    $.get("your_xml_file.xml", function (data) {
      var text1 = $(data).find("text1").text();
      var text2 = $(data).find("text2").text();
      $("#input1").val(text1);
      $("#input2").val(text2);
    });
  });

  $("#loadScript").click(function () {
    $.getScript("your_script.js", function () {
      var additionalText = getAdditionalText();
      $("#myForm").after(additionalText);
    });
  });

  $("#clearForm").click(function () {
    $("#myForm")[0].reset();
    $("p").empty();
  });
});
