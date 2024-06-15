import inquirer from "inquirer";
import * as fs from "fs/promises";

(async () => {
  const cmd = process.argv.at(-1);
  if (cmd === "new") {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "类型",
        choices: ["小技巧", "迷惑行为"],
      },
      {
        type: "input",
        name: "name",
        message: "名称",
      },
    ]);
    const path = `./计划/${answers.type}/${answers.name}/show.ts`;
    await fs.mkdir(`./计划/${answers.type}/${answers.name}`);
    await fs.writeFile(
      path,
      `/**\n * ${
        answers.name
      }\n * ${new Date().toLocaleString()}\n * {url}\n */`
    );
    console.log("创建成功", path);
  } else if (cmd === "archive") {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "类型",
        choices: ["小技巧", "迷惑行为"],
      },
      {
        type: "list",
        name: "name",
        message: "名称",
        choices: async (answers) =>
          (
            await fs.readdir(`./计划/${answers.type}`)
          ).filter((name) => !name.startsWith(".")),
      },
      {
        type: "input",
        name: "url",
        message: "B 站视频链接",
        validate: (value) =>
          /^https:\/\/www\.bilibili\.com\/video\/BV[a-zA-Z0-9]+\/?/.test(
            value
          ) || "请输入正确的视频链接",
      },
    ]);
    let highestId = 0;
    const files = (
      await fs.readdir(`./计划/${answers.type}/${answers.name}`)
    ).filter((name) => !name.startsWith("."));
    for (const file of files) {
      const id = parseInt(file.split(".")[0]);
      if (id > highestId) {
        highestId = id;
      }
    }
    await fs.writeFile(
      `./计划/${answers.type}/${answers.name}/show.ts`,
      (
        await fs.readFile(
          `./计划/${answers.type}/${answers.name}/show.ts`,
          "utf-8"
        )
      ).replace("{url}", answers.url)
    );
    const path = `./${answers.type}/${highestId + 1}.${answers.name}`;
    await fs.rename(`./计划/${answers.type}/${answers.name}`, path);
    console.log("归档成功", path);
  } else {
    console.log("无效命令", cmd);
  }
})();
