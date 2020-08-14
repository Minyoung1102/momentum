const checking_LS = "whether";

function paintLine() {
  const chk_obj = document.getElementsByName("box");
  const chk_leng = chk_obj.length;
}

function checkline() {
  const checking = localStorage.getItem(checking_LS);
  if (checking !== null) {
    paintLine();
  } else {
  }
}

function init() {
  checkline();
}

init();
