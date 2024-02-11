$(document).ready(function () {
  const userFName = document.getElementById("userFName");
  const userLName = document.getElementById("userLName");
  const userEmail = document.getElementById("userEmail");
  const userPhone = document.getElementById("userPhone");
  const userCCName = document.getElementById("user-credit-name");
  const userCCNum = document.getElementById("user-credit-number");
  const userCCExpr = document.getElementById("user-credit-expr");
  const userCcCvc = document.getElementById("user-credit-cvc");

  $("#user-credit-number").on("keyup", function (e) {
    // get value of the input field
    var val = $(this).val();
    var newval = "";
    // write regex to remove any space
    val = val.replace(/\s/g, "");
    // iterate through each numver
    for (var i = 0; i < val.length; i++) {
      // add space if modulus of 4 is 0
      if (i % 4 == 0 && i > 0) newval = newval.concat(" ");
      // concatenate the new value
      newval = newval.concat(val[i]);
    }
    // update the final value in the html input
    $(this).val(newval);
  });

  $("#user-credit-expr").on("keyup", function (e) {
    // get value of the input field
    var val = $(this).val();
    var newval = "";
    // write regex to remove any space
    val = val.replace(/\s/g, "");
    val = val.replace("/", "");
    // iterate through each numver
    for (var i = 0; i < val.length; i++) {
      // add space if modulus of 4 is 0
      if (i % 2 == 0 && i > 0) newval = newval.concat("/");
      // concatenate the new value
      newval = newval.concat(val[i]);
    }
    // update the final value in the html input
    $(this).val(newval);
  });

  userFName.addEventListener("change", function () {
    if (userFName.validity.valueMissing)
      userFName.setCustomValidity("โปรดกรอกชื่อ");
    else userFName.setCustomValidity("");
    userFName.reportValidity();
  });
  userLName.addEventListener("change", function () {
    if (userLName.validity.valueMissing)
      userLName.setCustomValidity("โปรดกรอกนามสกุล");
    else userLName.setCustomValidity("");
    userLName.reportValidity();
  });
  userEmail.addEventListener("change", function () {
    if (userEmail.validity.valueMissing)
      userEmail.setCustomValidity("โปรดกรอกอีเมล");
    else if (userEmail.validity.patternMismatch)
      userEmail.setCustomValidity("รูปแบบอีเมลไม่ถูกต้องโปรดกรอกอีกครั้ง");
    else userEmail.setCustomValidity("");
    userEmail.reportValidity();
  });
  userPhone.addEventListener("change", function () {
    if (userPhone.validity.valueMissing)
      userPhone.setCustomValidity("โปรดกรอกหมายเลขโทรศัพท์");
    else if (userPhone.validity.patternMismatch)
      userPhone.setCustomValidity(
        "หมายเลขเบอร์โทรศัพท์ต้องประกอบด้วยตัวเลข 8-10 ตัวเท่านั้น"
      );
    else userPhone.setCustomValidity("");
    userPhone.reportValidity();
  });
  userCCName.addEventListener("change", function () {
    if (userCCName.validity.valueMissing)
      userCCName.setCustomValidity("โปรดกรอกขื่อบัตรบนบัตร");
    else userCCName.setCustomValidity("");
    userCCName.reportValidity();
  });
  userCCNum.addEventListener("change", function () {
    if (userCCNum.validity.valueMissing)
      userCCNum.setCustomValidity("โปรดกรอกหมายเลขบัตรเครดิต/เดบิต");
    else if (userCCNum.validity.patternMismatch)
      userCCNum.setCustomValidity(
        "หมายเลขบัตรเครดิต/เดบิตต้องประกอบด้วยตัวเลขเท่านั้น"
      );
    else userCCNum.setCustomValidity("");
    userCCNum.reportValidity();
  });
  userCCExpr.addEventListener("change", function () {
    if (userCCExpr.validity.valueMissing)
      userCCExpr.setCustomValidity("โปรดกรอกวันหมดอายุของบัตร");
    else if (userCCExpr.validity.patternMismatch)
      userCCExpr.setCustomValidity(
        "วันหมดอายุของบัตรต้องประกอบด้วยตัวเลขเท่านั้น"
      );
    else userCCExpr.setCustomValidity("");
    userCCExpr.reportValidity();
  });
  userCcCvc.addEventListener("change", function () {
    if (userCcCvc.validity.valueMissing)
      userCcCvc.setCustomValidity("โปรดกรอกรหัสยืนยันตัวตน");
    else if (userCcCvc.validity.patternMismatch)
      userCcCvc.setCustomValidity(
        "รหัสยืนยันตัวตนต้องประกอบด้วยตัวเลขเท่านั้น"
      );
    else userCcCvc.setCustomValidity("");
    userCcCvc.reportValidity();
  });
  fetchProvinces();
});

function sortAsd(array) {
  return array.sort((a, b) => {
    if (a.nameTh && b.nameTh) {
      return a.nameTh > b.nameTh ? 1 : b.nameTh > a.nameTh ? -1 : 0;
    } else return 0;
  });
}

const fetchProvinces = async () => {
  try {
    const response = await fetch(
      "https://api.cnxdevsoft.com/api/Address/get-all-province"
    );
    if (response.status == 200) {
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }
      const jsonData = await response.json();

      for (const province of sortAsd(jsonData.data)) {
        const provinceName = province.nameTh;
        $("#userProvince").append(
          `<option value=${province.id}>${provinceName}</option>`
        );
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const fetchDistricts = async () => {
  const provinceIdSelected = $("#userProvince").find(":selected").val();
  // clear previous data
  const textPlacehoder = "โปรดเลือกอำเภอ";
  $("#userDistrict")
    .find("option")
    .remove()
    .end()
    .append(`<option value="${textPlacehoder}">${textPlacehoder}</option>`);
  $("#userSubDistrict").find("option").remove();
  $("#userPostalCode").val("");

  try {
    const response = await fetch(
      `https://api.cnxdevsoft.com/api/Address/get-district-by-provinceId?provinceId=${provinceIdSelected}`
    );
    if (response.status == 200) {
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }
      const jsonData = await response.json();

      for (const district of sortAsd(jsonData.data)) {
        const districtName = district.nameTh;
        $("#userDistrict").append(
          `<option value=${district.id}>${districtName}</option>`
        );
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

let postalCodeOption = [];

const fetchSubDistricts = async () => {
  const districtIdSelected = $("#userDistrict").find(":selected").val();

  // clear previous data

  postalCodeOption = [];
  const textPlacehoder = "โปรดเลือกตำบล";

  $("#userSubDistrict")
    .find("option")
    .remove()
    .end()
    .append(`<option value="${textPlacehoder}">${textPlacehoder}</option>`);
  $("#userPostalCode").val("");

  try {
    const response = await fetch(
      `https://api.cnxdevsoft.com/api/Address/get-subdistrict-by-districtId?districtId=${districtIdSelected}`
    );
    if (response.status == 200) {
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }
      const jsonData = await response.json();
      for (const subDistrict of sortAsd(jsonData.data)) {
        $("#userSubDistrict").append(
          `<option value=${subDistrict.id}>${subDistrict.nameTh}</option>`
        );

        postalCodeOption.push({
          id: subDistrict.id,
          nameTh: subDistrict.nameTh,
          code: subDistrict.postCode,
        });
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
function fillPostalCode() {
  const subdistrictIdSelected = $("#userSubDistrict").find(":selected").val();
  for (const subDistrict of postalCodeOption) {
    if (subDistrict.id == subdistrictIdSelected)
      $("#userPostalCode").val(subDistrict.code);
  }
}
