var electron = require("electron"),
  proc1 = require("child_process"),
  proc2 = require("child_process"),
child = proc1.spawn(electron, ["."]),
server = proc2.exec("node ./bin/www");