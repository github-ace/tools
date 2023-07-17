import { IApi } from "umi";

export default (api: IApi) => {
  api.modifyHTML(($) => {
    $("html").attr("lang", "zh-cn");
    return $;
  });
};
