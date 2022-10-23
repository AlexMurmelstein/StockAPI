var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import puppeteer from "puppeteer";
let main_actual = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const browser = yield puppeteer.launch({ headless: false });
        const page = yield browser.newPage();
        const URL = "https://finance.yahoo.com/most-active/";
        yield page.goto(URL, { waitUntil: "networkidle2" });
        const scrapedData = yield page.evaluate(() => {
            Array.from(document.querySelectorAll(".simpTblRow"));
        });
        yield browser.close();
        console.log(scrapedData);
        return;
    }
    catch (e) {
        console.log(e);
    }
});
let main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield main_actual();
});
main();
//# sourceMappingURL=puppeteer.js.map