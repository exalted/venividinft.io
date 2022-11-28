const { execSync } = require("child_process");
const { readFileSync, writeFileSync, rmSync, renameSync } = require("fs");

const SPIDER_CMD =
  "wget --force-directories --recursive --level=inf --page-requisites --convert-links --adjust-extension --no-remove-listing";
const DIRECTORY = "venividinft.wixsite.com/";
const MOCKUP_PATH = `${DIRECTORY}/mockup.html`;

rmSync(DIRECTORY, { recursive: true, force: true });

console.log(execSync(`${SPIDER_CMD} https://venividinft.wixsite.com/mockup`));

let contents = readFileSync(MOCKUP_PATH, { encoding: "utf-8" });

writeFileSync(MOCKUP_PATH, (contents = contents.replace(/<\/link>/g, "")), {
  encoding: "utf-8",
});

console.log(execSync(`prettier --write ${MOCKUP_PATH}`, { encoding: "utf-8" }));
contents = readFileSync(MOCKUP_PATH, { encoding: "utf-8" });

writeFileSync(
  MOCKUP_PATH,
  (contents = contents.replace(
    /--wix-ads-top-height: 50px;/,
    "--wix-ads-top-height: 0;"
  )),
  {
    encoding: "utf-8",
  }
);

renameSync(MOCKUP_PATH, "index.html");

console.log(`\
Now open index.html and remove the <div> with \`id="WIX_ADS"\`.
`);
