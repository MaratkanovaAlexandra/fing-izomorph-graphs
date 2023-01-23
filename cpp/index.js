const { spawn } = require("child_process");

  const child = spawn("./index"); //where a is the exe file generated on compiling the code.
  child.stdin.write("3\n");
  child.stdin.write("1-2\n");
  child.stdin.write("1-3\n");
  child.stdin.write("exit\n");

  child.stdin.write("2\n");
  child.stdin.write("1-2\n");
  child.stdin.end();


  child.stdout.on("data", (data) => {
    console.log(`${data}`);
  });
